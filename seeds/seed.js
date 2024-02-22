const sequelize = require('../config/connection');
const { User } = require('../models');
const { Game } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');

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
  }
  catch {
    console.log("Error in seeding database");
  }
  

  process.exit(0);
};

seedDatabase();
