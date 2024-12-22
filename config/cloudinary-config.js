// import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require("cloudinary").v2


// cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
// });

cloudinary.config({ 
        cloud_name: "dss4tygxb", 
        api_key: "237716652994751", 
        api_secret: "DhrmcD36-pLwZQvHL7Yv55JZL7I" // Click 'View API Keys' above to copy your API secret
});

module.exports = {cloudinary};