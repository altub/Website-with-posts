const express = require('express');
const app = express();
const {registerUserValidation, loginUserValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const {JWT_SECRET, SESSION_EXPIRES = 60 * 60} = process.env;

app.post('/register', async (req, res) => {
    try {
        await registerUserValidation.validateAsync(req.body, {abortEarly: false});
        const {
            username,
            email,
            first_name,
            last_name,
            password,
        } = req.body;

        let user = await db.query(
            'SELECT user_id FROM users u WHERE u.username = $1  or u.email = $2', 
            [username, email],
        );

        if(user.rows.length > 0 ){
            return res
                    .status(401)
                    .json({message: 'Username or email is already taken.'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const dbUser = await db.query(
            'INSERT INTO users(username, email, first_name, last_name, password) values($1, $2, $3, $4, $5) RETURNING user_id, username',
            [username, email, first_name, last_name, hashedPassword],
        );
        
        user = {userID: dbUser.rows[0].user_id}
        const token = jwt.sign(user, JWT_SECRET, {expiresIn: SESSION_EXPIRES});
        return res.status(200).json({message: 'Ok', token});
    } catch (err) {
        res.status(500).json({message: 'Enter the correct information', err});
    }
});

app.post('/login', async (req, res) => {
    try {
        await loginUserValidation.validateAsync(req.body, {abortEarly: false});
        const {
            username,
            password,
        } = req.body;
        
        const user = await db.query(
            'SELECT * FROM users WHERE username = $1', 
            [username]
        );
        
        if(user.rows[0] === 0){
            return res
                    .status(401)
                    .json({message: 'Invalid username or password'})
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword){
            return res
                    .status(401)
                    .json({message: 'Invalid username or password'})
        }

        const currentUser = {userID: user.rows[0].user_id};
        const token = jwt.sign(currentUser, JWT_SECRET, {expiresIn: SESSION_EXPIRES});


        res.status(200).header('auth-token', token).json({message: 'Ok', token});
    } catch (err) {
        res.status(500).json({message: 'Invalid username or password', err});
    }
});

module.exports = app;