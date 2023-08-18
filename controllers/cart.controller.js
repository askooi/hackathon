const Product = require("../models/product.model");
async function getCart(t, a) {
  a.render("customer/cart/cart");
}
async function addCartItem(t, a, e) {
  let d;
  try {
    (d = await Product.findById(t.body.productId)),
      (quantity = await t.body.quantity);
  } catch (t) {
    return void e(t);
  }
  const r = a.locals.cart;
  r.addItem(d, quantity),
    (t.session.cart = r),
    a
      .status(201)
      .json({ message: "Cart updated!", newTotalItems: r.totalQuantity });
}
function updateCartItem(t, a) {
  const e = a.locals.cart,
    d = e.updateItem(t.body.productId, +t.body.quantity);
  (t.session.cart = e),
    a.json({
      message: "Item updated!",
      updatedCartData: {
        newTotalQuantity: e.totalQuantity,
        newTotalPrice: e.totalPrice,
        updatedItemPrice: d.updatedItemPrice,
      },
    });
}
module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
