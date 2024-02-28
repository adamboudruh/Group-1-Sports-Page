require('dotenv').config();
const axios = require('axios');

const loadNewGames = async () => {
    try{
        console.log(process.env.NODE_ENV);
        const baseURL = process.env.NODE_ENV === 'production' 
             ? 'http://localhost:3001/api/games/reloadgames' 
             : 'https://pacific-shelf-77218-ba08c8175600.herokuapp.com/api/games/reloadgames'; // This checks if there is a variable called NODE_ENV in our env file set to equal 'production'. For some reason this was only working for me if I used an exact URL, so if there is that variable it assumes that we're testing it locally. If there isn't it uses the heroku url to fetch the data.
        console.log(baseURL);
        const response = await axios.get(`${baseURL}`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
  } catch (err) {console.log("Error running route: "+err)};
}

module.exports = {loadNewGames};
