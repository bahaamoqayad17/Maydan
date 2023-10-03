const express = require("express");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgetPassword", AuthController.forgetPassword);
router.post("/verifyCode", AuthController.verifyCode);
router.post("/resetPassword", AuthController.resetPassword);

module.exports = router;
