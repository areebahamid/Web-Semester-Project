const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const  {generateTokenOwner} = require("../utils/jsonWebToken");

const logoutOwner = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

const loginOwner = async(req,res)=>{
  try {
    let {fullName ,email, password}= req.body;
    /// chechk if any data is null
    if (!fullName || !email || !password) {
      return res.status(204).send("All fields are required");
    }

    let owner = await ownerModel.findOne({email : email});
    if(!owner){
      return res.status(404).send("Incorrect email or password");
    }else{
      // console.log(owner)
      bcrypt.compare(password, owner.password).then(function (result){
        if (!result) {
          return res.status(401).send("Incorrect email or password");
        }
        let token = generateTokenOwner(owner)
        res.cookie("token", token);
        res.status(202).redirect("/owners/shop");

      })
    }

  } catch (error) {
    
  }
};

module.exports = {logoutOwner,loginOwner};