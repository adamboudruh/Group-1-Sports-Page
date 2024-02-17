const { Model, DataTypes } = require('sequelize'); // Import necessary modules from Sequelize
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const sequelize = require('../config/connection'); // Import the connection to the database

// Define the User model, extending Sequelize's Model class
class User extends Model {
  // Method to compare a login password with the hashed password stored in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its attributes and options
User.init(
  {
    // Define the 'id' attribute
    id: {
      type: DataTypes.INTEGER, // Data type is INTEGER
      allowNull: false, // It cannot be null
      primaryKey: true, // It is the primary key
      autoIncrement: true, // It auto-increments
    },
    // Define the 'name' attribute
    name: {
      type: DataTypes.STRING, // Data type is STRING
      allowNull: false, // It cannot be null
    },
    // Define the 'email' attribute
    email: {
      type: DataTypes.STRING, // Data type is STRING
      allowNull: false, // It cannot be null
      unique: true, // It must be unique
      validate: { // Additional validation for email format
        isEmail: true, // It must be a valid email address
      },
    },
    // Define the 'password' attribute
    password: {
      type: DataTypes.STRING, // Data type is STRING
      allowNull: false, // It cannot be null
      validate: { // Additional validation for password length
        len: [8], // It must be at least 8 characters long
      },
    },
  },
  {
    // Hooks are functions that are called before or after certain events
    hooks: {
      // Before creating a new user, hash the password using bcrypt
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize, // Pass the connection instance to the model
    timestamps: false, // Disable timestamps for createdAt and updatedAt columns
    freezeTableName: true, // Do not pluralize the table name
    underscored: true, // Use snake_case for column names
    modelName: 'user', // Set the model name
  }
);

module.exports = User; // Export the User model for usage in other files