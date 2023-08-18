const express = require("express"),
  csController = require("../controllers/service.controller"),
  router = express.Router();
router.get("/inquire", csController.getInquire),
  router.post("/inquire", csController.postInquire),
  router.get("/faq", csController.getFaq),
  router.get("/my", csController.getMyInquiries),
  (module.exports = router);
