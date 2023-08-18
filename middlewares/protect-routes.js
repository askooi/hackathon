function protectRoutes(t, e, o) {
  return e.locals.isAuth
    ? t.path.startsWith("/admin") && !e.locals.isAdmin
      ? e.redirect("/403")
      : void o()
    : e.redirect("/401");
}
module.exports = protectRoutes;
