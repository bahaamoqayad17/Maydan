const express = require("express");
const SettingController = require("../Controllers/SettingController");

const router = express.Router();

router.route("/").get(SettingController.index).post(SettingController.create);

router
  .route("/:id")
  .get(SettingController.show)
  .put(SettingController.update)
  .delete(SettingController.delete);

module.exports = router;
