const router = require('express').Router(); // Import the Router class from Express
const userRoutes = require('./userRoutes'); // Import userRoutes module
const gameRoutes = require('./gameRoutes'); // Import gameRoutes module
const oddsRoutes = require('./oddsRoutes'); // Import oddsRoutes module

// Mount the userRoutes under the '/users' path
router.use('/users', userRoutes);
// Mount the gameRoutes under the '/games' path
router.use('/games', gameRoutes);
// Mount the oddsRoutes under the '/odds' path
router.use('/odds', oddsRoutes);

module.exports = router; // Export the router module for usage in other files
