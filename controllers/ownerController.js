const ownerModel = require("../models/owner-model");

const logoutOwner = async (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

module.exports = {logoutOwner};