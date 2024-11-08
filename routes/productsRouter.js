const express = require('express');
const router  = express.Router();
const upload = require("../config/multer-config");
const {createProduct,deleteProduct} = require('../controllers/productController')
const isloggedInOwner = require("../middleware/isLoggedinOwner")

router.get("/", (req, res)=>{
    res.send("product Router working")
});

// Route to create product
router.post("/create",upload.single("image"),createProduct);

router.get("/delete/:productId",isloggedInOwner,deleteProduct); // secured route

module.exports = router;