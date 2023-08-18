function checkAuthStatus(s, i, t) {
  const u = s.session.uid;
  if (!u) return t();
  (i.locals.uid = u),
    (i.locals.isAuth = !0),
    (i.locals.isAdmin = s.session.isAdmin),
    t();
}
module.exports = checkAuthStatus;
