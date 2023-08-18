const mongodb = require("mongodb"),
  db = require("../data/database");
class Product {
  constructor(t) {
    (this.title = t.title),
      (this.summary = t.summary),
      (this.price = +t.price),
      (this.description = t.description),
      (this.image = t.image),
      this.updateImageData(),
      t._id && (this.id = t._id.toString());
  }
  static async findById(t) {
    let e;
    try {
      e = new mongodb.ObjectId(t);
    } catch (t) {
      throw ((t.code = 404), t);
    }
    const i = await db.getDb().collection("products").findOne({ _id: e });
    if (!i) {
      const t = new Error("Could not find product with provided id.");
      throw ((t.code = 404), t);
    }
    return new Product(i);
  }
  static async findAll(t = "all") {
    let e;
    return (
      (e =
        "all" !== t
          ? await db
              .getDb()
              .collection("products")
              .find({ summary: t })
              .toArray()
          : await db.getDb().collection("products").find().toArray()),
      e.map(function (t) {
        return new Product(t);
      })
    );
  }
  static async findSearch(t) {
    try {
      const e = await db
        .getDb()
        .collection("products")
        .find({ title: new RegExp(t, "i") })
        .toArray();
      if (0 === e.length) return;
      return e.map(function (t) {
        return new Product(t);
      });
    } catch {
      return;
    }
  }
  static async findMultiple(t) {
    const e = t.map(function (t) {
      return new mongodb.ObjectId(t);
    });
    return (
      await db
        .getDb()
        .collection("products")
        .find({ _id: { $in: e } })
        .toArray()
    ).map(function (t) {
      return new Product(t);
    });
  }
  updateImageData() {
    (this.imagePath = `product-data/images/${this.image}`),
      (this.imageUrl = `/products/assets/images/${this.image}`);
  }
  async save() {
    const t = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    if (this.id) {
      const e = new mongodb.ObjectId(this.id);
      this.image || delete t.image,
        await db
          .getDb()
          .collection("products")
          .updateOne({ _id: e }, { $set: t });
    } else await db.getDb().collection("products").insertOne(t);
  }
  replaceImage(t) {
    (this.image = t), this.updateImageData();
  }
  remove() {
    const t = new mongodb.ObjectId(this.id);
    return db.getDb().collection("products").deleteOne({ _id: t });
  }
}
module.exports = Product;
