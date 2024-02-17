const sequelize = require('../config/connection'); // Import the connection to the database
const { User } = require('../models'); // Import the User model
const { Game } = require('../models'); // Import the Game model
const userData = require('./userData.json'); // Import user data from a JSON file
const gameData = require('./gameData.json'); // Import game data from a JSON file

// Define a function to seed the database with initial data
const seedDatabase = async () => {
  // Synchronize the database schema, dropping all tables if they exist
  await sequelize.sync({ force: true });

  // Seed the User table with userData
  await User.bulkCreate(userData, {
    individualHooks: true, // Apply model hooks for each user
    returning: true, // Include the created records in the returned promise value
  });

  // Seed the Game table with gameData
  await Game.bulkCreate(gameData, {
    returning: true, // Include the created records in the returned promise value
  });

  // Exit the process after seeding the database
  process.exit(0);
};

// Call the seedDatabase function to start the seeding process
seedDatabase();
