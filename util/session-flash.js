function getSessionData(s) {
  const a = s.session.flashedData;
  return (s.session.flashedData = null), a;
}
function flashDataToSession(s, a, e) {
  (s.session.flashedData = a), s.session.save(e);
}
module.exports = {
  getSessionData: getSessionData,
  flashDataToSession: flashDataToSession,
};
