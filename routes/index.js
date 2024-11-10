const express = require('express');
const router  = express.Router();
const isloggedIn = require("../middleware/isLoggedin");
const isLoggedinOwner = require("../middleware/isLoggedinOwner")
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');
const orderModel = require('../models/order-model')
const isloggedInOwner = require('../middleware/isLoggedinOwner');


router.get("/", (req, res)=>{
    let error = req.flash("error");
    res.render("index", {error})
});

router.get("/login", (req,res)=>{
    res.render("login")
});

router.get("/owners/login", (req,res)=>{
    res.render("loginOwner")
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
    let success= req.flash("success")
    res.render("shop", {products,success})
    }
    } catch (error) {
        console.log(error.message)
    }
});

router.get("/owners/shop",isloggedInOwner,async(req, res)=>{
    try {
        let products = await productModel.find()
    if(products){
        // if (products.image) {
        //     // Convert the image buffer to base64
        //     const imageBase64 = products.image.toString('base64');
        //     products.image = `data:image/jpeg;base64,${imageBase64}`; // You can also change the MIME type to match your image format
        //   }
        let success= req.flash("success")
    res.render("shopOwner", {products,success})
    }
    } catch (error) {
        console.log(error.message)
    }
});


router.get("/newProduct",isLoggedinOwner ,(req, res) => {
    let success = req.flash("success")
    let error = req.flash("error");
    res.render("newProduct" , {success,error})
});

router.get("/addToCart/:productid",isloggedIn,async(req,res)=>{
     console.log(req.params.productid)
    try {
        let user = await userModel.findOne({email: req.user.email})
        if(!user){return res.status(500).redirect('/shop')}
        // console.log(user)
        user.cart.push(req.params.productid)
        await user.save();
        req.flash("success" , "Added to Cart")
        res.redirect("/shop")
    } catch (error) {
        // console.log(error)
        res.status(404).send(error)
    }
})

router.get("/cart",isloggedIn,async(req,res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate("cart")
    // console.log(user.cart)
    let success = req.flash("success")
    res.render("cart",{user,success})
})


router.get("/orderslist",isloggedIn, async(req, res)=>{
    try {
        // console.log(req.user._id);
        let orders = await orderModel.find({ userId: req.user._id });
        res.render("orders", { orders: orders });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching orders");
    }
})

router.get("/owners/ordersPlaced",async(req, res)=>{
    try {
        let orders = await orderModel.find({})
        if(orders){
            // console.log(orders[0].userId)
            let details =await Promise.all(await orders.map(async (order)=> {
                
                let user =  await userModel.findOne({_id: order.userId},
                {userName: 1, email: 1, contact: 1})
                return {...order.toObject(),user}
            }) )
            // console.log(details)
            res.render("ordersPlaced",{details})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching orders");
    }
})

router.get("/myAccount",async(req,res)=>{
    res.render("myAccount")
})
module.exports = router;