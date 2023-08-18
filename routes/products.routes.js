const express = require("express"),
  productsController = require("../controllers/products.controller"),
  router = express.Router();
router.get("/products", productsController.getAllProducts),
  router.get("/products/dcevent", productsController.getDcEvent),
  router.get("/products/:id", productsController.getProductDetails),
  router.get("/products/:id/comments", productsController.getComments),
  router.post("/products/:id/comments", productsController.addComments),
  router.delete(
    "/products/:id/comments/:commentId",
    productsController.deleteComment
  ),
  (module.exports = router);
