const express = require("express"),
  ordersController = require("../controllers/orders.controller"),
  router = express.Router();
router.post("/", ordersController.addOrder),
  router.get("/", ordersController.getOrders),
  router.get("/cancel", ordersController.getCancelOrders),
  router.patch("/cancel/:id", ordersController.cancelOrder),
  (module.exports = router);
