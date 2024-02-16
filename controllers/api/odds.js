const router = require('express').Router();
const apiKey = process.env.API_KEY;


const path = require('path');

router.get('/:gameId', async (req, res) => {
    try {
        const gameId = req.params.gameId;
        
        // Fetch odds for the specified game ID
        const response = await fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${apiKey}&markets=h2h,spreads,totals&game=${gameId}`);
        if (!response.ok) throw new Error('Error in retrieving data');
        const data = await response.json();
        console.info(data);

       
        // Extract necessary data and send response
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  module.exports = router;