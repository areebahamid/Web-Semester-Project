const express = require('express');
const router  = express.Router();
const {regiesterUser, loginUser, logout} = require('../controllers/userController');


router.get("/", (req, res)=>{
    res.send("user Router working")
});

router.post("/register",regiesterUser);

router.post("/auth", loginUser );

router.get("/logout", logout)


//// exporting
module.exports = router;