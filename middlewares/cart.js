const Cart = require("../models/cart.model");
function initializeCart(t, e, i) {
  let a;
  if (t.session.cart) {
    const e = t.session.cart;
    a = new Cart(e.items, e.totalQuantity, e.totalPrice);
  } else a = new Cart();
  (e.locals.cart = a), i();
}
module.exports = initializeCart;
