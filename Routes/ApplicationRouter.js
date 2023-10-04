const express = require("express");
const ApplicationController = require("../Controllers/ApplicationController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.use(AuthController.protect);

router.post("/updateStatus", ApplicationController.updateStatus);

router
  .route("/")
  .get(ApplicationController.index)
  .post(
    ApplicationController.uploadFile,
    ApplicationController.savePDF,
    ApplicationController.create
  );

router
  .route("/:id")
  .get(ApplicationController.show)
  .put(
    ApplicationController.uploadFile,
    ApplicationController.savePDF,
    ApplicationController.update
  )
  .delete(ApplicationController.delete);

module.exports = router;
