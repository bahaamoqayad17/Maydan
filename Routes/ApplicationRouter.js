const express = require("express");
const ApplicationController = require("../Controllers/ApplicationController");

const router = express.Router();

router
  .route("/")
  .get(ApplicationController.index)
  .post(ApplicationController.create);

router
  .route("/:id")
  .get(ApplicationController.show)
  .put(ApplicationController.update)
  .delete(ApplicationController.delete);

module.exports = router;
