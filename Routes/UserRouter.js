const express = require("express");
const AuthController = require("../Controllers/AuthController");
const UserController = require("../Controllers/UserController");

const router = express.Router();

router.use(AuthController.protect);

router.route("/").get(UserController.index).post(UserController.create);

router.delete("/deleteMe", UserController.deleteMe);

router
  .route("/:id")
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;
