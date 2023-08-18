const mongodb = require("mongodb"),
  MongoClient = mongodb.MongoClient;
let database;

let mongodbUrl = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

async function connectToDatabase() {
  try {
    const o = await MongoClient.connect(mongodbUrl);
    database = o.db("online-shop");
  } catch {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}
function getDb() {
  if (!database) throw new Error("You must connect first!");
  return database;
}

module.exports = { connectToDatabase: connectToDatabase, getDb: getDb };
