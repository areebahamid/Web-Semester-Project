const express = require('express');
const router  = express.Router();
const {regiesterUser, loginUser,removeItemFromList} = require('../controllers/userController');
const isLoggedin = require('../middleware/isLoggedin')


router.get("/", (req, res)=>{
    res.send("user Router working")
});

router.post("/register",regiesterUser);

router.post("/auth", loginUser );

router.get("/removeitem/:cartItemid",isLoggedin,removeItemFromList )




//// exporting
module.exports = router;