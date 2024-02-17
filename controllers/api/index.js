const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const oddsRoutes = require('./oddsRoutes')

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/odds', oddsRoutes)

module.exports = router;
