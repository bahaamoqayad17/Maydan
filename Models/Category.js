const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    name: {
      ar: {
        type: String,
        required: [true, "Please provide a name"],
      },
      en: {
        type: String,
        required: [true, "Please provide a name"],
      },
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", Schema);

module.exports = Category;
