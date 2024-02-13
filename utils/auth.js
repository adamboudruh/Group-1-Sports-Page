const withAuth = (req, res, next) => {
  // TODO: Add a comment describing the functionality of this if statement
  // Authorization function that will run for each route, will redirect to login page if logged_in is false
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
