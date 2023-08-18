const express = require("express"),
  router = express.Router();
router.get("/", function (e, r) {
  r.redirect("/products");
}),
  router.get("/401", function (e, r) {
    r.status(401).render("shared/401");
  }),
  router.get("/403", function (e, r) {
    r.status(403).render("shared/403");
  }),
  (module.exports = router);
