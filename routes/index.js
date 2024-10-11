const express = require('express');
const router  = express.Router();
const isloggedIn = require("../middleware/isLoggedin");
const { render } = require('ejs');

router.get("/", (req, res)=>{
    let error = req.flash("error");
    res.render("index", {error})
});

router.get("/login", (req,res)=>{
    res.render("login")
});

router.get("/shop",isloggedIn,(req, res)=>{
    res.render("shop")
});

router.get("/newProduct", (req, res) => {
    res.render("newProduct")
});


module.exports = router;