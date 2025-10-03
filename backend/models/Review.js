const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewSchema = new schema(
  {
    username: { type: String, required: true },
    bookname: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
