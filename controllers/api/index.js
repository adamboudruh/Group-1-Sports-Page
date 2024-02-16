const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const odds = require('./odds')

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/odds',)

module.exports = router;
