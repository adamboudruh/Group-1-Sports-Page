const router = require('express').Router(); // Import the Router class from Express
const apiKey = process.env.API_KEY; // Retrieve the API key from environment variables
const { Game } = require('../../models');

let comments = []; // Array to store comments

// Route to get odds for a specific game ID
router.get('/:gameId', async (req, res) => {
    try {
        const gameId = req.params.gameId; // Extract the game ID from request parameters
        
        // Fetch odds for the specified game ID using the API
        const response = await fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/events/${gameId}/odds/?apiKey=${apiKey}&markets=h2h,spreads,totals&regions=us`);
        if (!response.ok) throw new Error('Error in retrieving data'); // Throw an error if response is not ok
        const odds = await response.json(); // Parse the JSON response
        console.info(odds); // Log the retrieved data to console

        const gameData = await Game.findByPk(gameId); // locates the game in the table using the id that is passed as a query parameter
        const game = gameData.get({ plain: true });
        console.info(game);

        res.render('singlegame', {
            logged_in: req.session.logged_in,
            odds
        })

        // Send the retrieved data as JSON response to client
        // res.json(data);
    } catch (error) {
        console.error('Error:', error); // Log any errors occurred during the process
        res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
});

// Route to post a comment to a selected game ID
router.post('/:gameId/comments', (req, res) => {
    try {
        const gameId = req.params.gameId; // Extract the game ID from request parameters
        const { comment } = req.body; // Extract the comment from request body
        
        // Add the comment to the in-memory storage
        comments.push({ gameId, comment });

        // Send success response
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error:', error); // Log any errors occurred during the process
        res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
});

// Route to edit a selected comment based on comment ID
router.put('/:gameId/comments/:commentId', (req, res) => {
    try {
        const gameId = req.params.gameId; // Extract the game ID from request parameters
        const commentId = req.params.commentId; // Extract the comment ID from request parameters
        const { comment } = req.body; // Extract the updated comment from request body
        
        // Find the comment by ID and update it
        const index = comments.findIndex(c => c.gameId === gameId && c.commentId === commentId);
        if (index !== -1) {
            comments[index].comment = comment;
            res.json({ message: 'Comment updated successfully' }); // Send success response
        } else {
            res.status(404).json({ error: 'Comment not found' }); // Send error response if comment not found
        }
    } catch (error) {
        console.error('Error:', error); // Log any errors occurred during the process
        res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
});

// Route to delete a selected comment based on comment ID
router.delete('/:gameId/comments/:commentId', (req, res) => {
    try {
        const gameId = req.params.gameId; // Extract the game ID from request parameters
        const commentId = req.params.commentId; // Extract the comment ID from request parameters

        // Find the comment by ID and remove it
        comments = comments.filter(c => !(c.gameId === gameId && c.commentId === commentId));
        res.json({ message: 'Comment deleted successfully' }); // Send success response
    } catch (error) {
        console.error('Error:', error); // Log any errors occurred during the process
        res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
});

module.exports = router; // Export the router module for usage in other files