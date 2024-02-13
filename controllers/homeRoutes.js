const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// checks to see if user is logged in before rendering homepage view
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({ //Creates an array called userData of all the user profiles in ascending order (excluding passwords)
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true })); //Serializes data into plain text

    res.render('homepage', {
      users,
    
      // Passes logged_in variable to the view so that it can be used
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If they're already logged in, redirects user to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
