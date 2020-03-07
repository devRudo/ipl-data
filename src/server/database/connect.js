// for automatically fetching environment variables from .env file
require('dotenv').config();
const { Client } = require('pg');
let client = new Client();

// function for connecting to database
let dbconnect = () => {
    client.connect()
        .then(() => {
            console.log("Connected Successfully");
        })
        .catch((err) => {
            console.log(err.stack.split("\n")[0].split(":")[1]);
        });
};

module.exports = { client, dbconnect };
