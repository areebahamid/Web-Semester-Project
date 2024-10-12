const productModel = require("../models/product-model");

const createProduct = async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    if (!name || !price || !bgcolor || !panelcolor ) {
      return res.status(204).send("name and price are must fields");
    }

    let product = productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    if (product) {
      req.flash("success", "Product has been created");
      res.redirect("/newProduct");
    }
    else{ return res.status(500).redirect("/newProduct")}
  } catch (error) {
    req.flash("error", "something went wrong");
    res.redirect("/newProduct")
  }
};

module.exports = { createProduct };
