// Define a middleware function for authorization
const withAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
    // If not logged in, redirect to the homepage or login page
    res.redirect('/homepage'); // You may want to change the redirection destination to the login page
  } else {
    // If logged in, proceed to the next middleware or route handler
    next();
  }
};

// Export the withAuth middleware for use in other files
module.exports = withAuth;
