const router = require('express').Router();
const apiKey = process.env.API_KEY;
const fs = require('fs');
const path = require('path');
const { Game } = require('../../models');
const gameData = require('./../../seeds/gameData.json');

router.get('/reloadgames', async (req, res) => { //This code makes a call to the sports api that we're using and loads a JSON file in the seeds folder of all the upcoming games
    try {
      const url =new URL(`https://api.the-odds-api.com/v4/sports/basketball_nba/events?apiKey=${apiKey}`);
  
      // Fetch data from the API
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error in retrieving data.');
      const data = await response.json();
      const currentDateTime = new Date();

      const filePath = path.resolve(__dirname, '../../seeds/gameData.json');
      const textPath = path.resolve(__dirname, '../../seeds/lastUpdated.txt');
      fs.writeFile(textPath, currentDateTime.toLocaleString(), (err) =>err ? console.log("Error in writing file: "+err) : console.log('Success!')); // This just displays the last time that the database was reloaded so we can easily see whether it's up to date or if something has gone wrong
      // console.log(data);
      // for (const game of data){
      //   console.log("Game 1: " + JSON.stringify(game));
      // }
      const currentDate = new Date();

      const oldGames = data.filter(game => new Date(game.commence_time) < currentDate);
      console.log("Old games: "+JSON.stringify(oldGames));
      const newGames = data.filter(game => new Date(game.commence_time) > currentDate);
      console.log("New games: "+JSON.stringify(newGames));
      for (const game of oldGames) {
        await Game.destroy({
          where: {
            id: game.id
          },
          truncate: false,
          cascade: false,
        })
      }
      fs.writeFile(filePath, JSON.stringify(newGames), (err) =>err ? console.log("Error in writing file: "+err) : console.log('Success!')); // Creates a JSON file containing the upcoming games that can be used to seed the database
      for (const game of gameData) {
        await Game.upsert(game, {
          returning: true,
        });
      }
      res.json(data); // Send the retrieved data as JSON response to client
    }
    catch (err) { console.info("Error in retrieving data from API: "+err) };
  });

router.get('/upcoming', async (req, res) => {
  console.log("Loading upcoming games!");
  try{
    const upcomingGameData = await Game.findAll(); // Pulls upcoming games from the database
    const upcomingGames = upcomingGameData.map(game => game.get({plain: true})); // Serializes them into a usable arraay
    // console.log(upcomingGames);

    res.render('upcoming', { // Passes the array of upcoming games to the page to be rendered along with the logged_in
      upcomingGames,
      logged_in: req.session.logged_In,
    })
    console.log("Rendering upcoming game page...");
  }
  catch (err) {
    console.error(err);
  }
})

module.exports = router; // Export the router module for usage in other files
