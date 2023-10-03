const factory = require("./FactoryHandler");
const Category = require("../Models/Category");

exports.index = factory.index(Category);
exports.create = factory.create(Category);
exports.show = factory.show(Category);
exports.update = factory.update(Category);
exports.delete = factory.delete(Category);
