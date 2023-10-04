const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    resume: {
      type: String,
      transform: (image) => `${process.env.BASE_URL}${image}`,
      required: [true, "Please provide a resume"],
    },
    cover_letter: {
      type: String,
      required: [true, "Please provide a cover letter"],
    },
    work: {
      type: String,
      required: [true, "Please provide a work Expirence"],
    },
    github: String,
    ad: {
      type: mongoose.Schema.ObjectId,
      ref: "Ad",
      required: [true, "Please provide an ad"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
    status: {
      type: Number,
      default: 0, // 0 => pending , 1 => accepted , 2 => rejected
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", Schema);

module.exports = Application;
