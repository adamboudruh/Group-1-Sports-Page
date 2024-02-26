const Sequelize = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

let sequelize;
let hostURL = '';
if (process.env.DB_NAME = 'dypg2j9n2u2h4jj0'){ // If the database name matches this, that means that the heroku database is being used, so it will need that host. If a local database is being used, then having that host value on line 21 will cause an error
  hostURL = 'cdm1s48crk8itlnr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
  console.log("Using heroku database");
} 

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
      host: hostURL, // Database host
      dialect: 'mysql', // Database dialect
      port: 3306 // Database port
    }
  );
}

module.exports = sequelize; // Exporting sequelize
