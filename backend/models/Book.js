const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookSchema = new schema({
  bookId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  reviews: [
    {
      user: { type: schema.Types.ObjectId, ref: "User", required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String, required: true },
    },
  ],
});
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
