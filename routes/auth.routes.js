const express = require("express"),
  authController = require("../controllers/auth.controller"),
  router = express.Router();
router.get("/signup", authController.getSignup),
  router.post("/signup", authController.signup),
  router.get("/login", authController.getLogin),
  router.post("/login", authController.login),
  router.post("/logout", authController.logout),
  (module.exports = router);
