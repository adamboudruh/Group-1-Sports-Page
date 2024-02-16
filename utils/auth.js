const withAuth = (req, res, next) => {
  
  // Authorization function that will run for each route, will redirect to login page if logged_in is false
  if (!req.session.logged_in) {
    res.redirect('/homepage');
  } else {
    next();
  }
};

module.exports = withAuth;
