const express = require("express"),
  paymentController = require("../controllers/payment.controller"),
  router = express.Router();
router.post("/", paymentController.doPayment),
  router.get("/", paymentController.getPayment),
  (module.exports = router);
