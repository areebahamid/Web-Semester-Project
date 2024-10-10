const jwt = require('jsonwebtoken');

const verifyJWT =(token)=>{
    let verify = jwt.verify(token, process.env.JWT_TOKEN);
    return verify
};

module.exports = verifyJWT;