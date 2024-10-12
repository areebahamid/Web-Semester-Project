const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jsonWebToken");

const regiesterUser = async (req, res) => {
  try {
    /// decomposing data
    let { fullName, email, password, contact } = req.body;
    /// chechk if any data is null
    if (!fullName || !email || !password || !contact) {
      return res.status(204).send("All fields are required");
    }
    /// chechk if existed
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(401).send("User already existed");
    } // if does not exist
    else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return res.status(500).res("try again later");
        }
        bcrypt.hash(password, salt, async function (err, hash) {
          //creating new user
          let createdUser = await userModel.create({
            fullName,
            email,
            password: hash,
            contact,
          });
          // generating token
          let token = generateToken(createdUser);
          res.cookie("token", token);

          res.status(200).send("user Created successfuly");
        });
      });
    }
  } catch (error) {
    res.send(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;
    /// chechk if any data is null
    if (!fullName || !email || !password) {
      return res.status(204).send("All fields are required");
    }

    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send("Incorrect email or password");
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (!result) {
          return res.status(401).send("Incorrect email or password");
        }
        let token = generateToken(user);
        res.cookie("token", token);
        res.status(202).redirect("/shop");
      });
    }
  } catch (error) {}
};



module.exports = {
  regiesterUser,
  loginUser
};
