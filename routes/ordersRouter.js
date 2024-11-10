const express = require('express')
const router = express.Router();
const {placeOrder, changeOrderStatus} = require('../controllers/orderController') 
const isLoggedin = require('../middleware/isLoggedin')

router.get("/", (req, res)=>{
    res.send("order Router working")
});

router.get("/placeOrder/:userid",isLoggedin,placeOrder);

router.get("/update/:orderId",changeOrderStatus)


module.exports = router;