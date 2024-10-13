const userModel = require('../models/user-model');
const verifyJWT = require('../utils/verifyJWT');

const isloggedIn = async(req, res, next)=>{
    if(!req.cookies.token){
        req.flash("error", "you need to login first")
        return res.redirect("/");
    }
    try {
        let verifiedUser = verifyJWT(req.cookies.token);
        if (!verifiedUser) {
            req.flash("error", "Invalid token, please login again.");
            return res.redirect("/");
        }
        // console.log("Verified user:", verifiedUser);  // Debugging: check what the payload contains
        let user = await userModel.findOne({ email: verifiedUser.email }).select("-password");
        if (!user) {
            req.flash("error", "User not found.");
            return res.redirect("/");
        }
        // console.log("Found user:", user);  // Debugging: check if the user is found in the DB
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in JWT verification or DB query:", error);  // Log the exact error for debugging
        req.flash("error", "Something went wrong.");
        res.redirect("/");
    }
    
};

module.exports = isloggedIn;