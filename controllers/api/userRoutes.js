const router = require('express').Router(); // Import the Router class from Express
const { User } = require('../../models'); // Import the User model



// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    // Find a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If user data doesn't exist, return an error
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password matches the hashed password stored in the database
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, return an error
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // If the email and password are correct, save the user's session
    req.session.save(() => {
      req.session.user_id = userData.id; // Store user ID in the session
      req.session.logged_in = true; // Set logged_in flag to true in the session
      
      // Send a response indicating successful login along with user data
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // If an error occurs during login process, send an error response
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    console.info("POST Route called... Attempting to sign up!");
    const dbUserData = await User.create({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  // Check if the user is logged in
  if (req.session.logged_in) {
    // If logged in, destroy the session and log the user out
    req.session.destroy(() => {
      res.status(204).end(); // Send a success response with status code 204 (No Content)
    });
  } else {
    // If the user is not logged in, send a 404 error response
    res.status(404).end();
  }
});



module.exports = router; // Export the router module for usage in other files