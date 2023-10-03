const factory = require("./FactoryHandler");
const Setting = require("../Models/Setting");

exports.index = factory.index(Setting);
exports.create = factory.create(Setting);
exports.show = factory.show(Setting);
exports.update = factory.update(Setting);
exports.delete = factory.delete(Setting);
