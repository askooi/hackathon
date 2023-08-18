const mongodb = require("mongodb");

let mongodbUrl = "mongodb://127.0.0.1:27017";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

const expressSession = require("express-session"),
  mongoDbStore = require("connect-mongodb-session");
function createSessionStore() {
  return new (mongoDbStore(expressSession))({
    uri: mongodbUrl,
    databaseName: "online-shop",
    collection: "sessions",
  });
}
function createSessionConfig() {
  return {
    secret: "super-secret",
    resave: !1,
    saveUninitialized: !1,
    store: createSessionStore(),
    cookie: { maxAge: 1728e5 },
  };
}
module.exports = createSessionConfig;
