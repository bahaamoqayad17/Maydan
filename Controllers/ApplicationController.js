const factory = require("./FactoryHandler");
const Application = require("../Models/Application");

exports.index = factory.index(Application);
exports.create = factory.create(Application);
exports.show = factory.show(Application);
exports.update = factory.update(Application);
exports.delete = factory.delete(Application);
