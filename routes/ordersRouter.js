const express = require('express')
const router = express.Router();
const {placeOrder} = require('../controllers/orderController') 
const isLoggedin = require('../middleware/isLoggedin')

router.get("/", (req, res)=>{
    res.send("order Router working")
});

router.get("/placeOrder/:userid",isLoggedin,placeOrder);


module.exports = router;