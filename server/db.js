const dotenv = require('dotenv');
const Pool = require('pg').Pool;

dotenv.config();

const {PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE} = process.env;
const connectionString = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

const db = new Pool({
    connectionString,
});

module.exports = db;