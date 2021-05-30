const express = require('express');
const app = express();
const verify = require('./verifyToken');
const db = require('../db');

//post users reply
app.post('/posts/reply/:postID', verify, async (req, res) => {
    try {
        const {
            description
        } = req.body;

        const { postID } = req.params;

        const newReply = await db.query('INSERT INTO reply(post_id, user_id, description, datetime) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
        [postID, req.user.userID, description]);

        res.status(200).json(newReply.rows[0]);
    } catch (err) {
        res.status(500).json({message: 'Unable to reply to post'});
    }
});

//get all of the users replies
app.get('/myReplies', verify, async (req, res) => {
    try {

        const allReplies = await db.query('SELECT * FROM reply WHERE user_id = $1',
        [req.user.userID]);

        res.status(200).json(allReplies.rows);
    } catch (err) {
        res.status(500).json({message: 'Unable to retrieve replies'});
    }
});

//delete users reply
app.delete('/posts/reply/:replyID', verify, async (req, res) => {
    try {
        const {replyID} = req.params;

        const deleteReply = await db.query('DELETE FROM reply WHERE user_id = $1 and reply_id = $2',
        [req.user.userID, replyID]);

        res.status(200).json({message: 'reply was deleted.'});
    } catch (err) {
        res.status(500).json({message: 'Failed to delete reply'});
    }
});

//update users reply
app.put('/posts/reply/:replyID', verify, async (req, res) => {
    try {
        const {
            description
        } = req.body;

        const { replyID} = req.params;
        
        const updateReply = await db.query('UPDATE reply SET description = $1, edited = true WHERE user_id = $2 and reply_id = $3',
        [description, req.user.userID, replyID]);

        res.status(200).json({message: 'Reply was updated.'})
    } catch (err) {
        res.status(500).json({message: 'Failed to edit reply'});
    }
});

module.exports = app;