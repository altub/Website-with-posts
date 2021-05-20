const express = require('express');
const app = express();
const verify = require('./verifyToken');
const db = require('../db');

//make users posts
app.post('/posts', verify, async (req, res) => {
    try {
        // use if using /posts/:username
        // const{
        //     description,
        // } = req.body;

        // const {username} = req.params;
        // const user = await db.query('SELECT * FROM users WHERE username = $1',
        // [username]);
        
        // const newPost = await db.query('INSERT INTO post(user_id, description, datetime) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *',
        // [user.rows[0].user_id, description]);

        const {
            description
        } = req.body;

        const newPost = await db.query('INSERT INTO post(user_id, description, datetime) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING *',
        [req.user.userID, description]);
        
        res.status(200).json(newPost.rows[0]);
        
    } catch (err) {
        res.status(500).json({message: 'Unable to post'});
    }
});

//get users posts
app.get('/myPosts', verify, async (req, res) => {
    try {
        // use if using '/myPosts/:username'
        // const {username} = req.params;
        // const user = await db.query('SELECT * FROM users WHERE username = $1',
        // [username]);

        // const allPosts = await db.query('SELECT * FROM post WHERE user_id = $1',
        // [user.rows[0].user_id]);

        const allPosts = await db.query('SELECT * FROM post WHERE user_id = $1',
        [req.user.userID]);

        res.status(200).json(allPosts.rows);
    } catch (err) {
        res.status(500).json({message: 'Unable to retrieve posts'});
    }
});

//delete users post
app.delete('/posts/:postID', verify, async (req, res) => {
    try {
        // use if using /posts/:username/:postID
        // const {username, postID} = req.params;
        // const user = await db.query('SELECT * FROM users WHERE username = $1',
        // [username]);

        // const deletePost = await db.query('DELETE FROM post WHERE user_id = $1 and post_id = $2',
        // [user.rows[0].user_id, postID]);

        const {postID} = req.params;
        const deletePost = await db.query('DELETE FROM post WHERE user_id = $1 and post_id = $2',
        [req.user.userID, postID]);

        res.status(200).json({message: 'Post was deleted.'});
    } catch (err) {
        res.status(500).json({message: 'Failed to delete post'});
    }
});

//update users post
app.put('/posts/:postID', verify, async (req, res) => {
    try {
        // use if using /posts/:username/:postID
        // const {
        //     description
        // } = req.body;

        // const {username, postID} = req.params;
        // const user = await db.query('SELECT * FROM users WHERE username = $1',
        // [username]);
        
        // const updatePost = await db.query('UPDATE post SET description = $1, edited = true WHERE user_id = $2 and post_id = $3',
        // [description, user.rows[0].user_id, postID]);

        const {
            description
        } = req.body;

        const { postID } = req.params;

        const updatePost = await db.query('UPDATE post SET description = $1, edited = true WHERE user_id = $2 and post_id = $3',
        [description, req.user.userID, postID]);

        res.status(200).json({message: 'Post was updated.'});
    } catch (err) {
        res.status(500).json({message: 'Failed to edit post'});
    }
});

//get all posts
app.get('/posts', async (req, res) =>{
    try {
        const allPosts = await db.query('SELECT * FROM post');

        res.status(200).json(allPosts.rows);
    } catch (err) {
        res.status(500).json({message: 'Failed to retrieve posts'});
    }
});

//get all replies related to a post
app.get('/posts/:postID', async (req, res) =>{
    try {
        const {postID} = req.params;

        const allReplies = await db.query('SELECT * FROM reply WHERE post_id = $1', 
        [postID]);

        res.status(200).json(allReplies.rows);
    } catch (err) {
        res.status(500).json({message: 'Failed to retrieve posts replies'});
    }
});

module.exports = app;