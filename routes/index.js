const express = require('express');
const router  = express.Router();
const isloggedIn = require("../middleware/isLoggedin");
const productModel = require('../models/product-model');

router.get("/", (req, res)=>{
    let error = req.flash("error");
    res.render("index", {error})
});

router.get("/login", (req,res)=>{
    res.render("login")
});

router.get("/logout",(req, res)=>{
    res.cookie("token","")
    res.redirect("/")
});

router.get("/shop",isloggedIn,async(req, res)=>{
    try {
        let products = await productModel.find()
    if(products){
        // if (products.image) {
        //     // Convert the image buffer to base64
        //     const imageBase64 = products.image.toString('base64');
        //     products.image = `data:image/jpeg;base64,${imageBase64}`; // You can also change the MIME type to match your image format
        //   }
    res.render("shop", {products})
    }
    } catch (error) {
        console.log(error.message)
    }
});

router.get("/newProduct",isloggedIn ,(req, res) => {
    let success = req.flash("success")
    let error = req.flash("error");
    res.render("newProduct" , {success,error})
});


module.exports = router;