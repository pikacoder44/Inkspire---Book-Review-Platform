const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookSchema = new schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
