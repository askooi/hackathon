function addCsrfToken(o, e, n) {
  (e.locals.csrfToken = o.csrfToken()), n();
}
module.exports = addCsrfToken;
