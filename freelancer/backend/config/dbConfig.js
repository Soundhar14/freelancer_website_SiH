const mysql = require('mysql2/promise');

const dotenv = require('dotenv')
dotenv.config();


const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0

  
});

connection.getConnection()
  .then(connection => {
    console.log('Database connected successfully!');
    connection.release();
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });


// db check


module.exports = connection;