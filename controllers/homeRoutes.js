const express = require('express'); // Import the Express framework
const router = express.Router(); // Create a new router instance
const { User } = require('../models'); // Import the User model

// Route to render the homepage view
router.get('/', async (req, res) => {
  try {
    // Retrieve all user profiles from the database, excluding passwords, and order them by name in ascending order
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }, // Exclude the 'password' attribute
      order: [['name', 'ASC']], // Order the results by the 'name' attribute in ascending order
    });

    // Serialize the user data into plain objects
    const users = userData.map((project) => project.get({ plain: true }));

    // Render the 'homepage' view and pass in the user data and logged_in flag to the view
    res.render('homepage', {
      users, // Pass the serialized user data to the view
      logged_in: req.session.logged_in, // Pass the logged_in variable to the view
    });
  } catch (err) {
    // If an error occurs during data retrieval or rendering, send a 500 (Internal Server Error) response
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect them to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // If the user is not logged in, render the 'login' view
  res.render('login', { 
    logged_in: req.session.logged_In,
  })
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect them to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // If the user is not logged in, render the 'signup' view
  res.render('signup', { 
    logged_in: req.session.logged_In,
  })
});

module.exports = router; // Export the router module for usage in other files