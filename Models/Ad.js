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
    company: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide a Company"],
    },
  },
  { timestamps: true }
);

const Ad = mongoose.model("Ad", Schema);

module.exports = Ad;
