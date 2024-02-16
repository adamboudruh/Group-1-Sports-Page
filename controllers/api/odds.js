const router = require('express').Router();
const apiKey = process.env.API_KEY;

let comments = [];

router.get('/:gameId', async (req, res) => {
    try {
        const gameId = req.params.gameId;
        
        //Fetch odds for the specified game ID
        const response = await fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${apiKey}&markets=h2h,spreads,totals&game=${gameId}`);
        if (!response.ok) throw new Error('Error in retrieving data');
        const data = await response.json();
        console.info(data);

       
        //Extract necessary data and send response
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Post comment to selected game ID
router.post('/:gameId/comments', (req, res) => {
    try {
        const gameId = req.params.gameId;
        const { comment } = req.body;
        
        //Add the comment to the in-memory storage
        comments.push({ gameId, comment });

        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Edit selected comment based on comment ID
router.put('/:gameId/comments/:commentId', (req, res) => {
    try {
        const gameId = req.params.gameId;
        const commentId = req.params.commentId;
        const { comment } = req.body;
        
        // Find the comment by ID and update it
        const index = comments.findIndex(c => c.gameId === gameId && c.commentId === commentId);
        if (index !== -1) {
            comments[index].comment = comment;
            res.json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Delete selected comment based on comment ID
router.delete('/:gameId/comments/:commentId', (req, res) => {
    try {
        const gameId = req.params.gameId;
        const commentId = req.params.commentId;

        // Find the comment by ID and remove it
        comments = comments.filter(c => !(c.gameId === gameId && c.commentId === commentId));
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


  module.exports = router;