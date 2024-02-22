const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const cron = require('node-cron');

const sequelize = require('./config/connection'); // Require the Sequelize connection

const SequelizeStore = require('connect-session-sequelize')(session.Store); // Require SequelizeStore for session storage using Sequelize

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3001; // Define the port for the server

const hbs = exphbs.create({ helpers }); // Create an instance of Express Handlebars with custom helpers

// Configure session settings
const sess = {
  secret: 'Super secret secret', // Secret used to sign the session ID cookie
  cookie: {}, // Additional cookie options can be specified here
  resave: false, // Prevents the session from being saved back to the session store if it wasn't modified during the request
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  store: new SequelizeStore({
    db: sequelize // Store session data in the Sequelize database
  })
};

// Use session middleware with the configured options
app.use(session(sess));

// Configure the Express application
app.engine('handlebars', hbs.engine); // Set Handlebars as the template engine
app.set('view engine', 'handlebars'); // Set the view engine to Handlebars
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, './public'))); // Serve static files from the 'public' directory

// Use the routes defined in the controllers
app.use(routes);

// cron.schedule(' * * * * *', () => {
//   // This function will be executed every minute
//   console.log('Running cron job...');
// });

// Sync the Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening')); // Start the server and listen on the specified port
});