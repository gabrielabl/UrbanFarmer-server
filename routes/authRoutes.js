const router = require("express").Router();
const authController = require("../Controllers/authController");

// SIGNUP
router.route("/signup").post(authController.signUp);

//LOGIN
router.route("/login").post(authController.login);

//GET LOGIN USER PROFILE
router.route("/profile").get(authController.profileUser);

//DATABASE EMAIL CHECKER
router.route("/emailcheck").post(authController.emailDbCheck);

module.exports = router;
