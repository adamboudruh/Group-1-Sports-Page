const router = require('express').Router(); // Import the Router class from Express

// Import the API routes module
const apiRoutes = require('./api');
// Import the home routes module
const homeRoutes = require('./homeRoutes.js');

// Mount the home routes under the root path '/'
router.use('/', homeRoutes);
// Mount the API routes under the '/api' path
router.use('/api', apiRoutes);

module.exports = router; // Export the router module for usage in other files
