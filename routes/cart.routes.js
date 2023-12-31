const express = require("express"),
  cartController = require("../controllers/cart.controller"),
  router = express.Router();
router.get("/", cartController.getCart),
  router.post("/items", cartController.addCartItem),
  router.patch("/items", cartController.updateCartItem),
  (module.exports = router);
