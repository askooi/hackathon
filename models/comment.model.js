const mongodb = require("mongodb"),
  db = require("../data/database");
class Comment {
  constructor(t, e, n, o, a) {
    (this.postId = new mongodb.ObjectId(t)),
      (this.userData = e),
      (this.text = n),
      (this.rating = o),
      (this.date = new Date(a)),
      this.date &&
        (this.formattedDate = this.date.toLocaleDateString("ko-KR", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        }));
  }
  async save() {
    this.date = new Date();
    return await db.getDb().collection("comments").insertOne(this);
  }
  static async findByUserId(t) {
    return await db
      .getDb()
      .collection("comments")
      .find({ "userData._id": new mongodb.ObjectId(t) })
      .toArray();
  }
  static async findByPostId(t) {
    return await db
      .getDb()
      .collection("comments")
      .find({ postId: new mongodb.ObjectId(t) })
      .toArray();
  }
  static async removeById(t) {
    return await db
      .getDb()
      .collection("comments")
      .deleteOne({ _id: new mongodb.ObjectId(t) });
  }
}
module.exports = Comment;
