const path = require("path"),
  express = require("express"),
  csrf = require("csurf"),
  expressSession = require("express-session");
let port = 3e3;
process.env.PORT && (port = process.env.PORT);
const createSessionConfig = require("./config/session"),
  db = require("./data/database"),
  addCsrfTokenMiddleware = require("./middlewares/csrf-token"),
  errorHandlerMiddleware = require("./middlewares/error-handler"),
  checkAuthStatusMiddleware = require("./middlewares/check-auth"),
  protectRoutesMiddleware = require("./middlewares/protect-routes"),
  cartMiddleware = require("./middlewares/cart"),
  updateCartPricesMiddleware = require("./middlewares/update-cart-prices"),
  notFoundMiddleware = require("./middlewares/not-found"),
  authRoutes = require("./routes/auth.routes"),
  productsRoutes = require("./routes/products.routes"),
  baseRoutes = require("./routes/base.routes"),
  adminRoutes = require("./routes/admin.routes"),
  cartRoutes = require("./routes/cart.routes"),
  ordersRoutes = require("./routes/orders.routes"),
  profileRoutes = require("./routes/profile.routes"),
  paymentRoutes = require("./routes/payment.routes"),
  serviceRoutes = require("./routes/service.routes"),
  app = express();
app.set("view engine", "ejs"),
  app.set("views", path.join(__dirname, "views")),
  app.use(express.static("public")),
  app.use("/products/assets", express.static("product-data")),
  app.use(express.urlencoded({ extended: !1 })),
  app.use(express.json());
const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig)),
  app.use(csrf()),
  app.use(cartMiddleware),
  app.use(updateCartPricesMiddleware),
  app.use(addCsrfTokenMiddleware),
  app.use(checkAuthStatusMiddleware),
  app.use(baseRoutes),
  app.use(authRoutes),
  app.use(productsRoutes),
  app.use("/cart", cartRoutes),
  app.use("/orders", protectRoutesMiddleware, ordersRoutes),
  app.use("/admin", protectRoutesMiddleware, adminRoutes),
  app.use("/profile", protectRoutesMiddleware, profileRoutes),
  app.use("/payment", protectRoutesMiddleware, paymentRoutes),
  app.use("/service", protectRoutesMiddleware, serviceRoutes),
  app.use(notFoundMiddleware),
  app.use(errorHandlerMiddleware),
  db
    .connectToDatabase()
    .then(function () {
      app.listen(port);
    })
    .catch(function (e) {
      console.log("Failed to connect to the database!"), console.log(e);
    });
