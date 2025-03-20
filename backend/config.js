const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to SQL database");
    }
});

module.exports = db;
// This code snippet establishes a connection to the MySQL database using the mysql2 package and the environment variables defined in the .env file. It exports the database connection for use in other parts of the application.