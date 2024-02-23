require('dotenv').config();
const axios = require('axios');

const loadNewGames = async () => {
    try{
        console.log(process.env.NODE_ENV);
        const baseURL = process.env.NODE_ENV === 'production' 
             ? 'http://localhost:3001/api/games/reloadgames' 
             : 'https://pacific-shelf-77218-ba08c8175600.herokuapp.com/api/games/reloadgames';
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