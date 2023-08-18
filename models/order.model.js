const mongodb = require("mongodb"),
  db = require("../data/database");
class Order {
  constructor(t, r, e, s = "주문완료", a, d) {
    (this.productData = t),
      (this.userData = r),
      (this.detail = e),
      (this.status = s),
      (this.date = new Date(a)),
      this.date &&
        (this.formattedDate = this.date.toLocaleDateString("ko-KR", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })),
      (this.id = d);
  }
  static transformOrderDocument(t) {
    return new Order(
      t.productData,
      t.userData,
      t.detail,
      t.status,
      t.date,
      t._id
    );
  }
  static transformOrderDocuments(t) {
    return t.map(this.transformOrderDocument);
  }
  static async findAll() {
    const t = await db
      .getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();
    return this.transformOrderDocuments(t);
  }
  static async findAllForUser(t, r = "") {
    const e = new mongodb.ObjectId(t);
    let s;
    return (
      (s =
        "" == r
          ? await db
              .getDb()
              .collection("orders")
              .find({
                $and: [{ "userData._id": e }, { $nor: [{ status: "취소됨" }] }],
              })
              .sort({ _id: -1 })
              .toArray()
          : await db
              .getDb()
              .collection("orders")
              .find({ $and: [{ "userData._id": e }, { status: r }] })
              .sort({ _id: -1 })
              .toArray()),
      this.transformOrderDocuments(s)
    );
  }
  static async findById(t) {
    const r = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: new mongodb.ObjectId(t) });
    return this.transformOrderDocument(r);
  }
  save() {
    if (this.id) {
      const t = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("orders")
        .updateOne({ _id: t }, { $set: { status: this.status } });
    }
    {
      const t = {
        userData: this.userData,
        productData: this.productData,
        detail: this.detail,
        date: new Date(),
        status: this.status,
      };
      return db.getDb().collection("orders").insertOne(t);
    }
  }
}
module.exports = Order;
