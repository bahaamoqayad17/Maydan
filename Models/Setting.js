const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {

  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", Schema);

module.exports = Setting;
