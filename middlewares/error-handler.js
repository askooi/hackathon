function handleErrors(r, e, s, o) {
  if ((console.log(r), 404 === r.code))
    return s.status(404).render("shared/404");
  s.status(500).render("shared/500");
}
module.exports = handleErrors;
