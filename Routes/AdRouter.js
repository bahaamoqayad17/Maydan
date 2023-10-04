const express = require("express");
const AdController = require("../Controllers/AdController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.use(AuthController.protect);

router.get("/myAds", AuthController.restrictTo("company"), AdController.myAds);
router.get(
  "/adApplications/:id",
  AuthController.restrictTo("company"),
  AdController.adApplications
);

router.route("/").get(AdController.index).post(AdController.create);

router
  .route("/:id")
  .get(AdController.show)
  .put(AdController.update)
  .delete(AdController.delete);

module.exports = router;
