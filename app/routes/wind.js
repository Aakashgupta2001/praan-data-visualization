const router = require("express").Router();

//for uploading excel file
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const windController = require("../controller/wind");
const auth = require("../middlewares/auth");

//routes for wind api's with middleware to verify jwt token
router.route("/").get(auth.verifyToken, windController.dashboard);
router.route("/pdata").get(auth.verifyToken, windController.pdata);
router.route("/device").get(auth.verifyToken, windController.perDeviceData);
router.route("/migrate").post(auth.verifyToken, upload.single("file"), windController.migrate);

module.exports = router;
