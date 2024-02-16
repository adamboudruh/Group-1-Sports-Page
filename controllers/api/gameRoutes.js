const router = require('express').Router();
const apiKey = process.env.API_KEY;


const fs = require('fs');
const path = require('path');

router.get('/upcoming', async (req, res) => {
    try {
      //Add some code that automatically takes todays day and adds a day to it

      const url =new URL('https://api.the-odds-api.com/v4/sports/basketball_nba/events?' + apiKey + '&commenceTimeTo=2024-02-16T00:00:00Z');
  
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error in retrieving data');
      const data = await response.json();
      console.info(data);

      const filePath = path.resolve(__dirname, '../../seeds/gameData.json');
      fs.writeFile(filePath, JSON.stringify(data), (err) =>err ? console.log("Error in writing file: "+err) : console.log('Success!')); 

      res.json(data);
      
    }
    catch (err) { console.info("Error in retrieving data from API: "+err) };
  });

  module.exports = router;