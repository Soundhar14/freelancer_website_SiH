const express = require(`express`);
const connection = require(`../config/dbConfig`);

const router = express.Router();

router.get('/', async(req,res)=>{
    res.status(200).send("success");
})

module.exports = router ;