const Comment = require("../models/comment.model"),
  Product = require("../models/product.model"),
  User = require("../models/user.model");
async function getAllProducts(t, e, r) {
  const o = t.query.category,
    c = t.query.search;
  let d;
  try {
    if (o && "모든 제품" !== o) {
      if (c) {
        if (((d = await Product.findSearch(c)), !d))
          return void e.render("customer/products/all-products", {
            products: [],
            category: '"' + c + '" 에 해당하는 제품을 찾을 수 없습니다',
            search: null,
          });
      } else d = await Product.findAll(o);
      e.render("customer/products/all-products", {
        products: d,
        category: o,
        search: c,
      });
    } else {
      if (c) {
        if (((d = await Product.findSearch(c)), !d))
          return void e.render("customer/products/all-products", {
            products: [],
            category: '"' + c + '" 에 해당하는 제품을 찾을 수 없습니다',
            search: null,
          });
      } else d = await Product.findAll();
      e.render("customer/products/all-products", {
        products: d,
        category: "모든 제품",
        search: c,
      });
    }
  } catch (t) {
    r(t);
  }
}
async function getProductDetails(t, e, r) {
  try {
    const r = await Product.findById(t.params.id),
      o = await Comment.findByPostId(t.params.id);
    e.render("customer/products/product-details", { product: r, comments: o });
  } catch (t) {
    r(t);
  }
}
async function getComments(t, e, r) {
  try {
    const r = await Comment.findByPostId(t.params.id);
    e.json(r);
  } catch (t) {
    return r(t);
  }
}
async function addComments(t, e, r) {
  let o;
  try {
    o = await User.findById(e.locals.uid);
  } catch (t) {
    return r(t);
  }
  const c = new Comment(t.params.id, o, t.body.text, t.body.rating);
  try {
    await c.save(), e.json({ message: "Comment added", comment: c });
  } catch (t) {
    return r(t);
  }
}
async function deleteComment(t, e, r) {
  const o = t.params.commentId;
  try {
    if (0 === (await Comment.removeById(o)).deletedCount)
      return e.status(404).json({ message: "Comment not found!" });
    e.json({ message: "Comment deleted!" });
  } catch (t) {
    return r(t);
  }
}
async function getDcEvent(t, e) {
  e.render("customer/products/dcevent");
}
module.exports = {
  getAllProducts: getAllProducts,
  getProductDetails: getProductDetails,
  getComments: getComments,
  addComments: addComments,
  deleteComment: deleteComment,
  getDcEvent: getDcEvent,
};
