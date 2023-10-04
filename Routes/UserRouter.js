const express = require("express");
const AuthController = require("../Controllers/AuthController");
const UserController = require("../Controllers/UserController");

const router = express.Router();

router.use(AuthController.protect);

router.delete("/deleteMe", UserController.deleteMe);
router.get("/notifications", UserController.notifications);

router.route("/").get(UserController.index).post(UserController.create);

router.post(
  "/updateMe",
  UserController.uploadFile,
  UserController.saveFile,
  UserController.updateMe
);

router
  .route("/:id")
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;
