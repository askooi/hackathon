const bcrypt = require("bcryptjs"),
  mongodb = require("mongodb"),
  db = require("../data/database"),
  Comment = require("../models/comment.model"),
  User = require("../models/user.model"),
  authUtil = require("../util/authentication"),
  validation = require("../util/validation"),
  sessionFlash = require("../util/session-flash");
async function showProfile(o, e) {
  try {
    const o = await User.findById(e.locals.uid);
    e.render("customer/profile/profile", { inputData: o });
  } catch (o) {
    next(o);
  }
}
async function showComments(o, e, s) {
  try {
    const s = o.session.uid,
      a = await Comment.findByUserId(s);
    e.render("customer/profile/user-comments", { comments: a });
  } catch (o) {
    console.error(o), s(o);
  }
}
async function changeProfileForm(o, e, s) {
  try {
    const o = await User.findById(e.locals.uid);
    e.render("customer/profile/change-profile", { inputData: o });
  } catch (o) {
    s(o);
  }
}
async function changeProfile(o, e, s) {
  const a = {
    email: o.body.email,
    password: o.body.password,
    confirmPassword: o.body["confirm-password"],
    name: o.body.name,
    postal: o.body.postal,
    local: o.body.local,
    phone: o.body.phone,
  };
  if (
    !validation.userDetailsAreValid(
      o.body.email,
      o.body.password,
      o.body.name,
      o.body.postal,
      o.body.local,
      o.body.phone
    ) ||
    (o.body.password &&
      !validation.passwordIsConfirmed(
        o.body.password,
        o.body["confirm-password"]
      ))
  )
    sessionFlash.flashDataToSession(
      o,
      {
        errorMessage:
          "입력값을 확인하세요. 비밀번호는 최소 6자리를 넘어야하며, 우편번호는 5자리 숫자여야 합니다.",
        ...a,
      },
      function () {
        e.redirect("/profile/change");
      }
    );
  else {
    try {
      const o = await User.findById(e.locals.uid);
      if (!o)
        return e.status(404).send({ message: "사용자를 찾을 수 없습니다." });
      if ((a.email && (o.email = a.email), a.password)) {
        const e = await bcrypt.hash(a.password, 12);
        o.password = e;
      }
      a.name && (o.name = a.name),
        a.postal && (o.address.postalCode = a.postal),
        a.local && (o.address.local = a.local),
        a.phone && (o.phone = a.phone);
      1 !==
        (
          await db
            .getDb()
            .collection("users")
            .updateOne({ _id: new mongodb.ObjectId(e.locals.uid) }, { $set: o })
        ).modifiedCount && s(error);
    } catch (o) {
      return void s(o);
    }
    e.redirect("/profile");
  }
}
module.exports = {
  showProfile: showProfile,
  showComments: showComments,
  changeProfileForm: changeProfileForm,
  changeProfile: changeProfile,
};
