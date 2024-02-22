const router = require('express').Router();
const apiKey = process.env.API_KEY;
const fs = require('fs');
const path = require('path');
const { Game } = require('../../models');

router.get('/load', async (req, res) => { //This code makes a call to the sports api that we're using and loads a JSON file in the seeds folder of all the upcoming games
    try {
      const url =new URL(`https://api.the-odds-api.com/v4/sports/basketball_nba/events?apiKey=${apiKey}`);
  
      // Fetch data from the API
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error in retrieving data.');
      const data = await response.json();
      // const data = "THIS IS A TEST";
      const currentDateTime = new Date();

      const filePath = path.resolve(__dirname, '../../seeds/gameData.json');
      const textPath = path.resolve(__dirname, '../../seeds/lastUpdated.txt');
      fs.writeFile(filePath, JSON.stringify(data), (err) =>err ? console.log("Error in writing file: "+err) : console.log('Success!')); 
      fs.writeFile(textPath, currentDateTime.toLocaleString(), (err) =>err ? console.log("Error in writing file: "+err) : console.log('Success!')); 

      res.json(data); // Send the retrieved data as JSON response to client
    }
    catch (err) { console.info("Error in retrieving data from API: "+err) };
  });

router.get('/upcoming', async (req, res) => {
  try{
    const upcomingGameData = await Game.findAll();
    const upcomingGames = upcomingGameData.map(game => game.get({plain: true}));
    // console.log(upcomingGames);

    res.render('landingpage', {
      upcomingGames,
    })
    console.log("Rendering landing page...");
  }
  catch (err) {
    console.error(err);
  }
})


// Route to get a game object containing all of a game's info and render it
// router.get('/singlegame/:game_id', async (req, res) => {
//     try{
//       const gameId = req.params.game_id;
//       const gameData = await Game.findByPk(gameId); // locates the game in the table using the id that is passed as a query parameter
      
//       const game = gameData.get({ plain: true });
//       console.log(game);

//       const response = await fetch(`/api/odds/${gameId}`);
//       const oddsData = await response.json();
//       const odds = oddsData.map(line => line.get({plain: true}));

//       res.render('singlegame', {
//         game,
//         odds
//       })
//     }
//     catch (err) {
//       console.error(err);
//     }
// })

module.exports = router; // Export the router module for usage in other files