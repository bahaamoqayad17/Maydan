const factory = require("./FactoryHandler");
const Ad = require("../Models/Ad");
const CatchAsync = require("../Utils/CatchAsync");
const Application = require("../Models/Application");

exports.index = factory.index(Ad);
exports.create = CatchAsync(async (req, res, next) => {
  const data = await Ad.create({
    ...req.body,
    company: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data,
  });
});
exports.show = factory.show(Ad);
exports.update = factory.update(Ad);
exports.delete = factory.delete(Ad);

exports.myAds = CatchAsync(async (req, res, next) => {
  const data = await Ad.find({ company: req.user._id });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.adApplications = CatchAsync(async (req, res, next) => {
  const data = await Application.find({ ad: req.params.id }).populate("user");

  res.status(200).json({
    status: "success",
    data,
  });
});
