function createUserSession(s, e, i) {
  (s.session.uid = e._id.toString()),
    (s.session.isAdmin = e.isAdmin),
    s.session.save(i);
}
function destroyUserAuthSession(s) {
  s.session.uid = null;
}
module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
