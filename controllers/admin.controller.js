const Product = require("../models/product.model"),
  Order = require("../models/order.model");
async function getProducts(t, e, r) {
  try {
    const t = await Product.findAll();
    e.render("admin/products/all-products", { products: t });
  } catch (t) {
    return void r(t);
  }
}
function getNewProduct(t, e) {
  e.render("admin/products/new-product");
}
async function createNewProduct(t, e, r) {
  const d = new Product({ ...t.body, image: t.file.filename });
  try {
    await d.save();
  } catch (t) {
    return void r(t);
  }
  e.redirect("/admin/products");
}
async function getUpdateProduct(t, e, r) {
  try {
    const r = await Product.findById(t.params.id);
    e.render("admin/products/update-product", { product: r });
  } catch (t) {
    r(t);
  }
}
async function updateProduct(t, e, r) {
  const d = new Product({ ...t.body, _id: t.params.id });
  t.file && d.replaceImage(t.file.filename);
  try {
    await d.save();
  } catch (t) {
    return void r(t);
  }
  e.redirect("/admin/products");
}
async function deleteProduct(t, e, r) {
  let d;
  try {
    (d = await Product.findById(t.params.id)), await d.remove();
  } catch (t) {
    return r(t);
  }
  e.json({ message: "Deleted product!" });
}
async function getOrders(t, e, r) {
  try {
    const t = await Order.findAll();
    e.render("admin/orders/admin-orders", { orders: t });
  } catch (t) {
    r(t);
  }
}
async function updateOrder(t, e, r) {
  const d = t.params.id,
    c = t.body.newStatus;
  try {
    const t = await Order.findById(d);
    (t.status = c),
      await t.save(),
      e.json({ message: "Order updated", newStatus: c });
  } catch (t) {
    r(t);
  }
}
module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getOrders: getOrders,
  updateOrder: updateOrder,
};
