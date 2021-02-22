const express = require('express');
const app = express();
const verify = require('./verifyToken');
const db = require('../db');

//post users reply
app.post('/posts/reply/:username/:postID', verify, async (req, res) => {
    try {
        const {
            description
        } = req.body;

        const {username, postID} = req.params;
        const user = await db.query('SELECT * FROM users WHERE username = $1',
        [username]);

        const newReply = await db.query('INSERT INTO reply(post_id, user_id, description, datetime) VALUES($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
        [postID, user.rows[0].user_id, description]);

        res.status(200).json(newReply.rows[0]);
    } catch (err) {
        res.status(500).json({message: 'Unable to reply to post'});
    }
});

//get all of the users replies
app.get('/myReplies/:username', verify, async (req, res) => {
    try {
        const {username} = req.params;
        const user = await db.query('SELECT * FROM users WHERE username = $1',
        [username]);

        const allReplies = await db.query('SELECT * FROM reply WHERE user_id = $1',
        [user.rows[0].user_id]);

        res.status(200).json(allReplies.rows);
    } catch (err) {
        res.status(500).json({message: 'Unable to retrieve replies'});
    }
});

//delete users reply
app.delete('/posts/reply/:username/:replyID', verify, async (req, res) => {
    try {
        const {username, replyID} = req.params;
        const user = await db.query('SELECT * FROM users WHERE username = $1',
        [username]);

        const deleteReply = await db.query('DELETE FROM reply WHERE user_id = $1 and reply_id = $2',
        [user.rows[0].user_id, replyID]);

        res.status(200).json({message: 'reply was deleted.'});
    } catch (err) {
        res.status(500).json({message: 'Failed to delete reply'});
    }
});

//update users reply
app.put('/posts/reply/:username/:replyID', verify, async (req, res) => {
    try {
        const {
            description
        } = req.body;

        const {username, replyID} = req.params;
        const user = await db.query('SELECT * FROM users WHERE username = $1',
        [username]);
        
        const updateReply = await db.query('UPDATE reply SET description = $1, edited = true WHERE user_id = $2 and reply_id = $3',
        [description, user.rows[0].user_id, replyID]);

        res.status(200).json({message: 'Reply was updated.'})
    } catch (err) {
        res.status(500).json({message: 'Failed to edit reply'});
    }
});

module.exports = app;