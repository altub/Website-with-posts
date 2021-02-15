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

module.exports = app;