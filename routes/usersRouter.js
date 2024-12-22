const express = require('express');
const router  = express.Router();
const {regiesterUser, loginUser,removeItemFromList, changeProfilePicture} = require('../controllers/userController');
const isLoggedin = require('../middleware/isLoggedin');
const isloggedIn = require('../middleware/isLoggedin');
const upload = require('../config/multer-config');


router.get("/", (req, res)=>{
    res.send("user Router working")
});

router.post("/register",regiesterUser);

router.post("/auth", loginUser );

router.get("/removeitem/:cartItemid",isLoggedin,removeItemFromList )

router.post("/changeProfile",upload.single("picture"),isloggedIn,changeProfilePicture)



//// exporting
module.exports = router;