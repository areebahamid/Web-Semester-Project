const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const {logoutOwner,loginOwner} = require('../controllers/ownerController');
const bcrypt = require("bcrypt");

//console.log(process.env.NODE_ENV);
//command to set ENV  => set NODE_ENV=development

router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res.status(503).send("Can not create new owner");
    }

    let { fullName, email, password, contact } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.status(500).res("try again later");
      }
      bcrypt.hash(password, salt, async function (err, hash) {
        let createdOwner = await ownerModel.create({
          fullName,
          email,
          password: hash,
          contact,
        });
        res.status(201).send(createdOwner);
      });
    });
  });


router.get("/logout",logoutOwner);

router.post("/auth",loginOwner);



module.exports = router;
