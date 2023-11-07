const mysql = require('mysql');

// Create a connection to MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'MySQLpassword!', // Replace with your MySQL password
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.message);
        return;
    }
    console.log('Connected to MySQL');

    // Create the database and tables
    connection.query(`
        CREATE DATABASE IF NOT EXISTS ThesisDb;
        USE ThesisDb;
        CREATE TABLE IF NOT EXISTS users (
            userid BIGINT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(500) NOT NULL,
            email VARCHAR(500) NOT NULL,
            password VARCHAR(100) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS screentime (
            screentimeid BIGINT AUTO_INCREMENT PRIMARY KEY,
            screentimeduration TIMESTAMP NOT NULL
        );
        CREATE TABLE IF NOT EXISTS trackers (
            trackerid BIGINT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(500) NOT NULL,
            appname VARCHAR(100) NOT NULL,
            dateaccessed DATETIME
        );
    `, (err) => {
        if (err) {
            console.error('Error creating database and tables: ' + err.message);
            return;
        }
        console.log('Database and tables created');
    });

    // Close the connection
    connection.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection: ' + err.message);
            return;
        }
        console.log('MySQL connection closed');
    });
});
