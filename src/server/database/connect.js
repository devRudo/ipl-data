// for automatically fetching environment variables from .env file
require('dotenv').config();
const { Pool } = require('pg');
let pool = new Pool({
    max: 80,
    idleTimeoutMillis: 1000,
    connectionTimeoutMillis: 0,
});

module.exports = pool;