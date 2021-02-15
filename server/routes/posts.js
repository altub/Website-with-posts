const express = require('express');
const app = express();
const verify = require('./verifyToken');
const db = require('../db');

app.post('/posts/:username', verify, async (req, res) => {
    try {
        const{
            description,
        } = req.body;

        const {username} = req.params;
        const user = await db.query('SELECT * FROM users WHERE username = $1',
        [username]);
        
        const newPost = await db.query('INSERT INTO post(user_id, description, datetime) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *',
        [user.rows[0].user_id, description]);
        
        res.status(200).json(newPost.rows[0]);
        
    } catch (err) {
        res.status(500).json({message: 'Unable to post'});
    }
});

app.get('/myPosts/:username', verify, async (req, res) => {
    try {
        const {username} = req.params;
        const user = await db.query('SELECT * FROM users WHERE username = $1',
        [username]);

        const allPosts = await db.query('SELECT * FROM post WHERE user_id = $1',
        [user.rows[0].user_id]);

        res.json(allPosts.rows);
    } catch (err) {
        res.status(500).json({message: 'Unable to retrieve posts'});
    }
});

app.delete('/posts/:username/:postID', verify, async (req, res) => {
    try {
        const {username, postID} = req.params;
        const user = await db.query('SELECT * FROM users WHERE username = $1',
        [username]);

        const deletePost = await db.query('DELETE FROM post WHERE user_id = $1 and post_id = $2',
        [user.rows[0].user_id, postID]);

        res.status(200).json({message: 'Post was deleted.'});
    } catch (err) {
        res.status(500).json({message: 'Failed to delete post'});
    }
});

app.put('/posts/:username/:postID', verify, async (req, res) => {
    try {
        const {
            description
        } = req.body;

        const {username, postID} = req.params;
        const user = await db.query('SELECT * FROM users WHERE username = $1',
        [username]);
        
        const updatePost = await db.query('UPDATE post SET description = $1, edited = true WHERE user_id = $2 and post_id = $3',
        [description, user.rows[0].user_id, postID]);

        res.status(200).json({message: 'Post was updated.'})
    } catch (err) {
        res.status(500).json({message: 'Failed to edit post'});
    }
});

module.exports = app;