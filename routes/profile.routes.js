const express = require("express"),
  profileController = require("../controllers/profile.controller"),
  router = express.Router();
router.get("/", profileController.showProfile),
  router.get("/comments", profileController.showComments),
  router.get("/change", profileController.changeProfileForm),
  router.post("/change", profileController.changeProfile),
  (module.exports = router);
