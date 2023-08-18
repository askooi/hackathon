const bcrypt = require("bcryptjs"),
  mongodb = require("mongodb"),
  db = require("../data/database");
class User {
  constructor(s, e, t, a, i, r) {
    (this.email = s),
      (this.password = e),
      (this.name = t),
      (this.address = { postalCode: a, local: i }),
      (this.phone = r);
  }
  static findById(s) {
    const e = new mongodb.ObjectId(s);
    return db
      .getDb()
      .collection("users")
      .findOne({ _id: e }, { projection: { password: 0 } });
  }
  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }
  async existsAlready() {
    return !!(await this.getUserWithSameEmail());
  }
  async signup() {
    const s = await bcrypt.hash(this.password, 12);
    await db
      .getDb()
      .collection("users")
      .insertOne({
        email: this.email,
        password: s,
        name: this.name,
        address: this.address,
        phone: this.phone,
      });
  }
  hasMatchingPassword(s) {
    return bcrypt.compare(this.password, s);
  }
  async save(s) {
    const e = await User.findById(s);
    if (this.email !== e.email) {
      if (await this.getUserWithSameEmail())
        throw new Error("이미 해당 이메일을 사용하는 사용자가 존재합니다.");
    }
    if (this.password) {
      if (!(await this.hasMatchingPassword(e.password)))
        throw new Error("기존 비밀번호가 올바르지 않습니다.");
      this.password = await bcrypt.hash(this.password, 12);
    } else this.password = e.password;
    await db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(s) },
        {
          $set: {
            email: this.email,
            password: this.password,
            name: this.name,
            address: this.address,
            phone: this.phone,
          },
        }
      );
  }
}
module.exports = User;
