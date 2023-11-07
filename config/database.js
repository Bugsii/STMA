const mysql = require('mysql2');
const dotenv = require('dotenv')

dotenv.config();

// Create connection with SQL database
const connection = mysql.createConnection({
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME // database created and is in dotenv file
});

// Connect to database
connection.connect((err) => {
    if(err) {
        console.error('Error connecting to database',err);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;