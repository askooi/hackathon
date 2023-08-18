const multer = require("multer"),
  uuid = require("uuid").v4,
  upload = multer({
    storage: multer.diskStorage({
      destination: "product-data/images",
      filename: function (e, u, i) {
        i(null, uuid() + "-" + u.originalname);
      },
    }),
  }),
  configuredMulterMiddleware = upload.single("image");
module.exports = configuredMulterMiddleware;
