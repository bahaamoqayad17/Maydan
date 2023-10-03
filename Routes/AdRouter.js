const express = require("express");
const AdController = require("../Controllers/AdController");

const router = express.Router();

router.route("/").get(AdController.index).post(AdController.create);

router
  .route("/:id")
  .get(AdController.show)
  .put(AdController.update)
  .delete(AdController.delete);

module.exports = router;
