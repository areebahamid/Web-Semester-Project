const multer = require("multer");

const storage = multer.memoryStorage();

// Only allow certain types of files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

// Set up multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
