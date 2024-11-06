const orderModel = require("../models/order-model");
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");

const placeOrder = async (req, res) => {
  // console.log(req.params.userid)
  let cartIds = req.user.cart;
//   console.log(cartIds);
  if (cartIds.length == 0) {
    return 
  } else {
    try {
      // let product (find products)
      let products = await productModel.find({ _id: { $in: cartIds } });
      if(products.length == 0){return}
      // console.log(products)
      const productMap = new Map(
        products.map((product) => [product.id.toString(), product])
      );
      // for (const product of productMap.values()) {
      //     console.log(product.price); // Logs the price of each product
      // }
      // Map items from the cart to include details from products
      let items = cartIds.map((productId) => {
        const product = productMap.get(productId.toString());
        return {
          productId: productId,
          name: product ? product.name : "Unknown Product",
          price: product ? product.price : "0",
          quantity: 1, // Default quantity; you can adjust based on cart details if needed
          discount: product ? product.discount || 0 : 0,
          image: product ? product.image : null,
          bgcolor: product ? product.bgcolor : "#ffffff", // Default color, change as needed
          panelcolor: product ? product.panelcolor : "#000000", // Default color, change as needed
          textcolor: product ? product.textcolor : "#333333", // Default color, change as needed
        };
      });

      let order = await orderModel.create({
        userId: req.user._id,
        userName: req.user.fullName,
        items: items,
        status: "pending",
      });

      if (order) {
        let user = await userModel.findOne({ email: req.user.email });
        user.cart = [];
        await user.save();
        console.log("order has been placed");
        res.redirect("/orderslist");
      } else {
        console.log("failed to place order! please try again later");
      }
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = {
  placeOrder,
};
