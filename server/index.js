const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express()

db.connect()
.then(() => {console.log('Database connected.'); })
.catch(async (err) => {
    console.err(err);
    await db.end();
});

const port = 5000 || process.env;
const database = process.env.PGDATABASE;

//middleware
app.use(cors());
app.use(express.json());

//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const replyRoute = require('./routes/replies');

//route middleware
app.use('/', authRoute);
app.use('/', postRoute);
app.use('/', replyRoute);

app.listen(port, () => {
    console.log(`Server has started on port ${port}.`);
});