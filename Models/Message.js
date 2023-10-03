const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    title: String,
    message: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", Schema);

module.exports = Message;
