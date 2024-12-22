const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/jsonWebToken");
const {cloudinary} = require("../config/cloudinary-config")
const { Readable } = require("stream");

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

const removeItemFromList = async (req, res)=>{
  // console.log("cart id : "+ req.params.cartItemid)
  let item = req.params.cartItemid
  try {
    let user = await userModel.findOne({email: req.user.email})
    if(!user){return res.status(500).redirect('/')}
    // console.log(user.fullName)
    user.cart.pull({ _id: item });
    await user.save();
    req.flash("success" , "Removed from Cart")
    res.status(200)
    .redirect("/cart");

  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while removing the item.");
  }
};


const bufferToStream = (buffer) => {
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null); // Signal the end of the stream
  return readable;
};

const changeProfilePicture = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      req.flash("error", "No file uploaded");
      return res.redirect("/myAccount");
    }

    // Log Cloudinary configuration to debug issues
    console.log("Cloudinary Config:", cloudinary.config());

    // Function to upload buffer to Cloudinary
    const uploadToCloudinary = (buffer) =>
      new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "profile_pictures" }, // Optional folder in Cloudinary
          (error, result) => {
            if (result) resolve(result); // Resolve promise if upload is successful
            else reject(error); // Reject promise if upload fails
          }
        );

        // Pipe the buffer as a stream to Cloudinary
        bufferToStream(buffer).pipe(uploadStream);
      });

    // Upload file buffer to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);

    // Success
    req.flash("success", "Profile picture updated successfully!");
    res.redirect("/myAccount");
  } catch (error) {
    // Log error details for debugging
    console.error("Error uploading file:", error);

    // Flash error message and redirect
    req.flash("error", "Something went wrong while uploading the image");
    res.redirect("/myAccount");
  }
};

// const changeProfilePicture = async (req, res)=>{
//   try {
//     if (!req.file) {
//       req.flash("error", "No file uploaded");
//       return res.redirect("/myAccount");
//     }
//     console.log(cloudinary.config());

//     const uploadToCloudinary = (buffer) =>
//       new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "profile_pictures" }, // Optional: specify the folder in Cloudinary for organizing files
//           (error, result) => {
//             if (result) resolve(result); // Resolve the promise with the Cloudinary response if upload is successful
//             else reject(error); // Reject the promise with an error if something goes wrong
//           }
//         );
    
//         // Convert buffer to stream and pipe it to Cloudinary
//         bufferToStream(buffer).pipe(uploadStream);
//       });

//       const result = await uploadToCloudinary(req.file.buffer);
//       if(result){
//       req.flash("success", "Profile picture updated successfully!");
//       res.redirect("/myAccount");
//       }

//   } catch (error) {
//     console.error("Error uploading file:", error);
//     req.flash("error", "Something went wrong while uploading the image");
//     res.redirect("/myAccount");
//   }
// };



module.exports = {
  regiesterUser,
  loginUser,
  removeItemFromList,
  changeProfilePicture,
};
