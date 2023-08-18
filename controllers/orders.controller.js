const Order = require("../models/order.model"),
  User = require("../models/user.model"),
  Product = require("../models/product.model");
async function getOrders(r, e) {
  try {
    const r = await Order.findAllForUser(e.locals.uid);
    e.render("customer/orders/all-orders", { orders: r });
  } catch (r) {
    next(r);
  }
}
async function addOrder(r, e, d) {
  const s = r.session.products;
  let t;
  const o = {
    postalCode: r.body.postalCode,
    address: r.body.userAddress,
    paymentMethod: r.body.paymentMethod,
  };
  try {
    t = await User.findById(e.locals.uid);
  } catch (r) {
    return d(r);
  }
  const a = new Order(s, t, o);
  try {
    await a.save();
  } catch (r) {
    return void d(r);
  }
  (r.session.products = null), e.redirect("/orders");
}
async function getCancelOrders(r, e, d) {
  try {
    const r = await Order.findAllForUser(e.locals.uid, "취소됨");
    e.render("customer/orders/cancel-orders", { orders: r });
  } catch (r) {
    d(r);
  }
}
async function cancelOrder(r, e, d) {
  const s = r.params.id;
  try {
    const r = await Order.findById(s);
    (r.status = "취소됨"),
      await r.save(),
      e.json({ message: "Order updated", newStatus: "취소됨" });
  } catch (r) {
    d(r);
  }
}
module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getCancelOrders: getCancelOrders,
  cancelOrder: cancelOrder,
};
