const express = require('express');
const router  = express.Router();
const upload = require("../config/multer-config")

router.get("/", (req, res)=>{
    res.send("product Router working")
});


router.post("/create",upload.single("image"),(req, res)=>{
    // res.send(" /owners/product/create is working")
    res.send(req.file)
    
})

module.exports = router;