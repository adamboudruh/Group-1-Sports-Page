const router = require('express').Router(); // Import the Router class from Express
const apiKey = process.env.API_KEY; // Retrieve the API key from environment variables
const { Game } = require('../../models');
const { User } = require('../../models');
const { Comments } = require('../../models');

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
        const commentData = await Comments.findAll({ 
            where: { game_id: gameId },
            include: User
        }); //Only pulls the comments for that specific game and the associated user for each comment
        const comments = commentData.map(comment => comment.get({plain: true}));
        
        //to this comment array, add an additional field on each object that contains the corresponding username from the Users table

        // console.info(`User of id ${req.session.user_id} is viewing this page`); 

        res.render('singlegame', {
            logged_in: req.session.logged_in,
            user_id: req.session.user_id, // User ID session variable is passed so the page knows what user is logged in
            odds,
            comments
        })

        // Send the retrieved data as JSON response to client
        // res.json(data);
    } catch (error) {
        console.error('Error:', error); // Log any errors occurred during the process
        res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
});

// Route to post a comment to a selected game ID
router.post('/:gameId/comments', async (req, res) => {
    try {
        const gameId = req.params.gameId; // Extract the game ID from request parameters
        const body = req.body.comment; // Extract the comment from request body
        console.log(`Posting comment with body: ${body}`);
        const userID = req.session.user_id;

        // Add the comment to the in-memory storage
        const comment = await Comments.create({
            content: body,
            game_id: gameId,
            user_id: userID,
          });

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
router.delete('/delete/:userId/:commentId', async (req, res) => {
    console.log("Deleting...");
    try {
        const commentId = req.params.commentId; // Extract the comment ID from request parameters
        const userId = req.params.userId; // Extract the user ID from request parameters

        // console.log(`Comment ID: ${userId}\nYour ID: ${req.session.user_id}`)

        if (userId == req.session.user_id) {
            const deletedComments = await Comments.destroy({
                where: {
                  id: commentId, // Delete the comment with this id
                },
              });
            res.status(200).send({ message: 'Comment deleted successfully' });
        }
        else { 
            const currentUserName = User.findByPk(req.session.user_id);
            const commentUserName = User.findByPk(userId);
            res.status(401).send({ message: `That's not your comment! \nComment belongs to: ${commentUserName}\nYour name: ${currentUserName}.`}); 
        }

    } catch (error) {
        console.error('Error:', error); // Log any errors occurred during the process
        res.status(500).json({ error: 'Internal server error' }); // Send an error response
    }
});

module.exports = router; // Export the router module for usage in other files