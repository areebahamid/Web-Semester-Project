const userModel = require('../models/user-model');
const jwt = require('jsonwebtoken');
const verifyJWT = require('../utils/verifyJWT');

const isloggedIn = (req, res, next)=>{
    if(!req.cookies.token){
        req.flash("error", "you need to login first")
        return res.redirect("/");
    }

    try {
        let verifiedUser = verifyJWT(req.cookies.token)
        let user  = userModel.findOne({email: verifiedUser}).select("-password")
        req.user = user
        next()

    } catch (error) {
        req.flash("error", "something went wrong");
        res.redirect("/")
    }
};

module.exports = isloggedIn;