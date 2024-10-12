const express = require('express');
const router  = express.Router();
const upload = require("../config/multer-config");
const {createProduct} = require('../controllers/productController')

router.get("/", (req, res)=>{
    res.send("product Router working")
});

// Route to create product
router.post("/create",upload.single("image"),createProduct);

module.exports = router;