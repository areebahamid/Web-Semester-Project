require("dotenv").config();
var jwt = require('jsonwebtoken');

const generateToken = (createdUser)=>{
    return jwt.sign({email: createdUser.email,userid: createdUser._id}, process.env.JWT_TOKEN)
};

const generateTokenOwner = (createdOwner)=>{
    // console.log(createdOwner)
    return jwt.sign({email: createdOwner.email,ownerid: createdOwner._id}, process.env.JWT_TOKEN)
};
module.exports = {generateToken,generateTokenOwner};