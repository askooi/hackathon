const Product = require("../models/product.model"),
  User = require("../models/user.model");
async function getPayment(t, e, n) {
  const r = t.session.products,
    s = await User.findById(e.locals.uid);
  e.render("customer/payment/payment", { products: r, userData: s });
}
async function doPayment(t, e, n) {
  let r;
  if (t.body.productId) {
    let s;
    try {
      (s = await Product.findById(t.body.productId)),
        (quantity = parseInt(t.body.quantity));
    } catch (t) {
      return n(t);
    }
    if (!s) return e.status(404).send({ message: "제품을 찾을 수 없습니다!" });
    r = {
      items: [
        { product: s, quantity: quantity, totalPrice: s.price * quantity },
      ],
      totalQuantity: quantity,
      totalPrice: s.price * quantity,
    };
  } else {
    if (((r = e.locals.cart), !r || 0 === Object.keys(r.items).length))
      return e.send(
        "<script>alert('장바구니에 상품이 없습니다.'); window.location.href='/cart';</script>"
      );
    t.session.cart = null;
  }
  (t.session.products = null), (t.session.products = r), e.redirect("/payment");
}
module.exports = { getPayment: getPayment, doPayment: doPayment };
