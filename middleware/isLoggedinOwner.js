const ownerModel = require("../models/owner-model");
const verifyJWT = require("../utils/verifyJWT");

const isloggedInOwner = async(req,res,next)=>{

    if(!req.cookies.token){
        req.flash("error", "you need to login first")
        return res.redirect("/");
    }
    try {
        let verifiedOwner = verifyJWT(req.cookies.token);
        if (!verifiedOwner) {
            req.flash("error", "Invalid token, please login again.");
            return res.redirect("/");
        }
        let owner = await ownerModel.findOne({ email: verifiedOwner.email }).select("-password");
        if (!owner) {
            req.flash("error", "Onwer not found.");
            return res.redirect("/");
        }
        // console.log("i am is logg"+owner)
        req.owner = owner;
        next();
        
    } catch (error) {
        console.error("Error in JWT verification or DB query:", error);  // Log the exact error for debugging
        req.flash("error", "Something went wrong.");
        res.redirect("/");
    }
};

module.exports = isloggedInOwner;