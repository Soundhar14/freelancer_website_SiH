const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  } finally {
    if (connection) connection.release();
  }
}

testConnection();
