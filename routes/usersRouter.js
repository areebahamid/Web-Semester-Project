const express = require('express');
const router  = express.Router();
const {regiesterUser, loginUser} = require('../controllers/userController');


router.get("/", (req, res)=>{
    res.send("user Router working")
});

router.post("/register",regiesterUser);

router.post("/auth", loginUser );




//// exporting
module.exports = router;