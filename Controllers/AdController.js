const factory = require("./FactoryHandler");
const Ad = require("../Models/Ad");

exports.index = factory.index(Ad);
exports.create = factory.create(Ad);
exports.show = factory.show(Ad);
exports.update = factory.update(Ad);
exports.delete = factory.delete(Ad);
