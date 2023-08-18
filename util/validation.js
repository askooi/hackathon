function isEmpty(r) {
  return !r || "" === r.trim();
}
function userCredentialsAreValid(r, e) {
  return r && r.includes("@") && e && e.trim().length >= 6;
}
function userDetailsAreValid(r, e, s, i, t) {
  return (
    userCredentialsAreValid(r, e) && !isEmpty(s) && !isEmpty(i) && !isEmpty(t)
  );
}
function passwordIsConfirmed(r, e) {
  return r === e;
}
module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  passwordIsConfirmed: passwordIsConfirmed,
};
