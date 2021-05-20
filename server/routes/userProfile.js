const express = require('express');
const app = express();
const verify = require('./verifyToken');
const db = require('../db');

app.get('/profilePage', verify, async (req, res) => {
    try {
        
        const userInfo = await db.query('SELECT username, email, first_name, last_name FROM users WHERE user_id = $1',
        [req.user.userID]);

        res.status(200).json(userInfo.rows);
    } catch (err) {
        res.status(500).json({message: 'Error getting user profile.'});
    }
});

module.exports = app;