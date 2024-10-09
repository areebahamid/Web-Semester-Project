const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');


//console.log(process.env.NODE_ENV);
//command to set ENV  => set NODE_ENV=development 
if(process.env.NODE_ENV === "development"){
    router.post("/create", async(req, res)=>{
        let owner = await ownerModel.find()
        if(owner.length > 0){
            return res
            .status(503)
            .send("Can not create new owner")
        };

        let {fullName, email, password, contact} = req.body
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password,
            contact
        });

        res.status(201).send(createdOwner)

        
    });
};


router.get("/", (req, res)=>{
    res.send("owner Router working")
});






module.exports = router;