const sequelize = require('../config/connection'); // Import the connection to the database
const { User } = require('../models'); // Import the User model
const { Game } = require('../models'); // Import the Game model
const userData = require('./userData.json'); // Import user data from a JSON file
const gameData = require('./gameData.json'); // Import game data from a JSON file

// Define a function to seed the database with initial data
const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

  await Game.bulkCreate(gameData, {
    returning: true,
  })

  process.exit(0);
} catch (err) {console.info(err)};
}

// Call the seedDatabase function to start the seeding process
seedDatabase();
