const router = require('express').Router(); // Import the Router class from Express
const apiKey = process.env.API_KEY; // Retrieve the API key from environment variables

const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module

router.get('/upcoming', async (req, res) => {
    try {
      // Add some code that automatically takes today's date and adds a day to it
      
      // Construct the URL for the API request with the provided API key and commenceTimeTo parameter
      const url = new URL('https://api.the-odds-api.com/v4/sports/basketball_nba/events?' + apiKey + '&commenceTimeTo=2024-02-16T00:00:00Z');
  
      // Fetch data from the API
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error in retrieving data'); // Throw an error if response is not ok
      const data = await response.json(); // Parse the JSON response
      console.info(data); // Log the retrieved data to console

      // Write the retrieved data to a JSON file
      const filePath = path.resolve(__dirname, '../../seeds/gameData.json'); // Resolve the file path
      fs.writeFile(filePath, JSON.stringify(data), (err) => err ? console.log("Error in writing file: " + err) : console.log('Success!')); // Write data to file and handle errors

      res.json(data); // Send the retrieved data as JSON response to client
      
    }
    catch (err) { console.info("Error in retrieving data from API: " + err) }; // Catch and log any errors occurred during the process
});

module.exports = router; // Export the router module for usage in other files