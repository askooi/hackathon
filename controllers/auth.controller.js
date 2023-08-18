const User = require("../models/user.model"),
  authUtil = require("../util/authentication"),
  validation = require("../util/validation"),
  sessionFlash = require("../util/session-flash");
function getSignup(o, s) {
  let e = sessionFlash.getSessionData(o);
  e ||
    (e = {
      email: "",
      password: "",
      confirmPassword: "",
      fullname: "",
      postal: "",
      local: "",
      phone: "",
    }),
    s.render("customer/auth/signup", { inputData: e });
}
async function signup(o, s, e) {
  const i = {
    email: o.body.email,
    password: o.body.password,
    confirmPassword: o.body["confirm-password"],
    fullname: o.body.fullname,
    postal: o.body.postal,
    local: o.body.local,
    phone: o.body.phone,
  };
  if (
    !validation.userDetailsAreValid(
      o.body.email,
      o.body.password,
      o.body.fullname,
      o.body.postal,
      o.body.local,
      o.body.phone
    ) ||
    !validation.passwordIsConfirmed(o.body.password, o.body["confirm-password"])
  )
    return void sessionFlash.flashDataToSession(
      o,
      {
        errorMessage:
          "입력값을 확인하세요. 비밀번호는 최소 6자리를 넘어야하며, 우편번호는 5자리 숫자여야 합니다.",
        ...i,
      },
      function () {
        s.redirect("/signup");
      }
    );
  const a = new User(
    o.body.email,
    o.body.password,
    o.body.fullname,
    o.body.postal,
    o.body.local,
    o.body.phone
  );
  try {
    if (await a.existsAlready())
      return void sessionFlash.flashDataToSession(
        o,
        {
          errorMessage: "사용자가 존재합니다! 대신, 로그인을 시도하세요",
          ...i,
        },
        function () {
          s.redirect("/signup");
        }
      );
    await a.signup();
  } catch (o) {
    return void e(o);
  }
  s.redirect("/login");
}
function getLogin(o, s) {
  let e = sessionFlash.getSessionData(o);
  e || (e = { email: "", password: "" }),
    s.render("customer/auth/login", { inputData: e });
}
async function login(o, s, e) {
  const i = new User(o.body.email, o.body.password);
  let a;
  try {
    a = await i.getUserWithSameEmail();
  } catch (o) {
    return void e(o);
  }
  const n = {
    errorMessage: "인증 오류 - 이메일과 비밀번호를 다시한번 확인하세요!",
    email: i.email,
    password: i.password,
  };
  if (!a)
    return void sessionFlash.flashDataToSession(o, n, function () {
      s.redirect("/login");
    });
  (await i.hasMatchingPassword(a.password))
    ? authUtil.createUserSession(o, a, function () {
        s.redirect("/");
      })
    : sessionFlash.flashDataToSession(o, n, function () {
        s.redirect("/login");
      });
}
function logout(o, s) {
  authUtil.destroyUserAuthSession(o), s.redirect("/login");
}
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
