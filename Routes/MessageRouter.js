const express = require("express");
const MessageController = require("../Controllers/MessageController");

const router = express.Router();

router.route("/").get(MessageController.index).post(MessageController.create);

router
  .route("/:id")
  .get(MessageController.show)
  .put(MessageController.update)
  .delete(MessageController.delete);

module.exports = router;
