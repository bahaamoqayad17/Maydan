const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Please provide your category"],
    },
    content: {
      type: String,
      required: [true, "Please provide a title"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Ad = mongoose.model("Ad", Schema);

module.exports = Ad;
