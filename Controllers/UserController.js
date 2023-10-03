const factory = require("./FactoryHandler");
const User = require("../Models/User");
const CatchAsync = require("../utils/CatchAsync");

exports.index = factory.index(User);
exports.create = factory.create(User);
exports.show = factory.show(User);
exports.update = factory.update(User);
exports.delete = factory.delete(User);

exports.deleteMe = CatchAsync(async (req, res, next) => {
  await User.findByIdAndRemove(req.body.user._id);

  res.status(204).json({
    status: "success",
    data: "Deleted Successfully",
  });
});
