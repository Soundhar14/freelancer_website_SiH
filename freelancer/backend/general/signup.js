const express = require('express');
const bcrypt = require('bcryptjs');
const connection = require('../config/dbConfig');

const router = express.Router();

// Post request
router.post('/', async (req, res) => {
    // Parsing the body of the post
    const { user_email, user_password } = req.body;
    
    // Handling error cases
    if (!user_email || !user_password) {
        res.status(400).json({
            "message" : "Please enter all the details"
        });  // 
    }else{
          try {
        const hashedPassword = await bcrypt.hash(user_password, 12);
        const insertQuery = 
        `INSERT INTO user_details_table (user_email, user_password_hash)
        VALUES (?, ?)`;

        const [results] = await connection.query(insertQuery, [user_email, hashedPassword]);  // Await the query execution
        

        if(results.affectedRows > 0){
            res.status(200).json({ message: 'Successfully added the user'});
        }
       
    } 
    catch (error) {
        if(error.code === 'ER_DUP_ENTRY'){
            res.status(500).json({ message: 'Already account exists, try signing in' });  // Handle server errors
        }else{
        console.log(`Error during signup for ${user_email} ${error}`);
        res.status(500).json({ message: 'Internal server error' });  // Handle server errors
        }
    }
    }

  
});

module.exports = router;
