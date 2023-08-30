const router = require("express").Router();
const userController = require("../controller/user");

//routes for auth api's
router.route("/login").post(userController.login);
router.route("/signup").post(userController.signup);

module.exports = router;
