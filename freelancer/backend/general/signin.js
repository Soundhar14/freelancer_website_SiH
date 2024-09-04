const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../config/dbConfig'); // Import the database configuration

// POST request for sign-in
router.post('/', async (req, res) => {
    const { user_email, user_password } = req.body;

    // Check if both email and password are provided
    if (!user_email || !user_password) {
        return res.status(400).json({ "message": "Please enter all the details to sign in" });
    }

    try {
        // Query the database to find the user by email
        const query = `SELECT * FROM user_details_table WHERE user_email = ?`;
        const [results] = await connection.query(query, [user_email]);

        if (results.length === 0) {
            return res.status(401).json({ "message": "Invalid email or password" });
        }

        const storedPassword = results[0].user_password_hash;

        // Log the storedPassword for debugging
        console.log('Stored Password from DB:', storedPassword);

        // Ensure both user_password and storedPassword are not undefined or null
        if (!user_password || !storedPassword) {
            return res.status(401).json({ "message": "enter all the details" });
        }

        // Check if the entered password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(user_password, storedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ "message": "Invalid email or password" });
        }

        // If password matches, proceed with successful login
        res.status(200).json({ "message": "Sign-in successful" });

    } catch (error) {
        console.error("Error during sign-in:", error); // Log the error
        res.status(500).json({ "message": "Server error" });
    }
});

module.exports = router;
