const router = require('express').Router();
const apiKey = process.env.API_KEY;



router.get('/games', async (req, res) => {
    try {
      const url =new URL('https://api.the-odds-api.com/v4/sports/basketball_nba/events?' + apiKey + '&commenceTimeTo=2024-02-16T00:00:00Z');
  
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error in retrieving data');
      const data = await response.json();
      console.info(data);
      res.json(data);
    }
    catch (err) { console.info(err) };
  });

  module.exports = router;