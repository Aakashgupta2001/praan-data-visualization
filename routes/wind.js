const router = require("express").Router();

// controller for wind apis
const windController = require("../controller/wind");

router.route("/").get(windController.getWind);

module.exports = router;
