const mysql = require('mysql2');

// Load environment variables from .env
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test the connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);
});

// Close the connection
connection.end();
