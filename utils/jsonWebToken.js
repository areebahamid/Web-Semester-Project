var jwt = require('jsonwebtoken');

const generateToken = (createdUser)=>{
    return jwt.sign({email: createdUser.email,userid: createdUser._id}, process.env.JWT_TOKEN)
};

module.exports = generateToken;