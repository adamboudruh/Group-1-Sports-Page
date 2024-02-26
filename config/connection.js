const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

let sequelize;

// Check if JAWSDB_URL environment variable is set (commonly used in platforms like Heroku)
if (process.env.JAWSDB_URL) {
  // If JAWSDB_URL is set, create a Sequelize instance using the provided URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If JAWSDB_URL is not set, use local MySQL database credentials from .env file
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database username
    process.env.DB_PASSWORD, // Database password
    {
      host: '', // Database host
      dialect: 'mysql', // Database dialect
      port: 3306 // Database port
    }
  );
}

module.exports = sequelize; // Exporting sequelize
