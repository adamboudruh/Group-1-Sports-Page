const router = require('express').Router();
const apiKey = process.env.API_KEY;
const fs = require('fs');
const path = require('path');
const { Game } = require('../../models');

router.get('/upcoming', async (req, res) => {
    try {
      //Add some code that automatically takes todays day and adds a day to it

      const url =new URL(`https://api.the-odds-api.com/v4/sports/basketball_nba/events?apiKey=${apiKey}`);
  
      // Fetch data from the API
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error in retrieving data.');
      const data = await response.json();
      // const data = "THIS IS A TEST";
      console.info(data);
      const currentDateTime = new Date();

      const filePath = path.resolve(__dirname, '../../seeds/gameData.json');
      const textPath = path.resolve(__dirname, '../../seeds/lastUpdated.txt');
      fs.writeFile(filePath, JSON.stringify(data), (err) =>err ? console.log("Error in writing file: "+err) : console.log('Success!')); 
      fs.writeFile(textPath, currentDateTime.toLocaleString(), (err) =>err ? console.log("Error in writing file: "+err) : console.log('Success!')); 

      res.json(data); // Send the retrieved data as JSON response to client
      
    }
    catch (err) { console.info("Error in retrieving data from API: "+err) };
  });

  router.get('/singlegame/:game_id', async (req, res) => {
    try{
      const gameData = await Game.findByPk(req.params.game_id);
      
      const game = gameData.get({ plain: true });
      console.log(game);

      res.render('game', {
        game,
      })
    }
    catch (err) {
      console.error(err);
    }
  })

module.exports = router; // Export the router module for usage in other files