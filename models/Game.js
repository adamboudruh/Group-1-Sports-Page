const { Model, DataTypes } = require('sequelize'); // Import necessary modules from Sequelize
const sequelize = require('../config/connection'); // Import the connection to the database

// Define the Game model, extending Sequelize's Model class
class Game extends Model {}

// Initialize the Game model with its attributes and options
Game.init(
  {
    // Define the 'id' attribute
    id: {
<<<<<<< HEAD
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
=======
      type: DataTypes.INTEGER, // Data type is INTEGER
      allowNull: false, // It cannot be null
      primaryKey: true, // It is the primary key
>>>>>>> f2e8a97e1a826af0857568c2ead16755e4dce0a3
    },
    // Define the 'commence_time' attribute
    commence_time: {
      type: DataTypes.DATE, // Data type is DATE
      allowNull: false, // It cannot be null
    },
    // Define the 'home_team' attribute
    home_team: {
      type: DataTypes.STRING, // Data type is STRING
      allowNull: false, // It cannot be null
    },
    // Define the 'away_team' attribute
    away_team: {
      type: DataTypes.STRING, // Data type is STRING
      allowNull: false, // It cannot be null
    }
  },
  {
    sequelize, // Pass the connection instance to the model
    timestamps: false, // Disable timestamps for createdAt and updatedAt columns
    freezeTableName: true, // Do not pluralize the table name
    underscored: true, // Use snake_case for column names
    modelName: 'game', // Set the model name
  }
);

module.exports = Game; // Export the Game model for usage in other files