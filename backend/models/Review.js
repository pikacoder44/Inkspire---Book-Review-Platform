const model = require("mongoose").model;
const schema = require("mongoose").Schema;

const reviewSchema = new schema({
  username: { type: String, required: true },
  bookname: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
});

module.exports = model("Review", reviewSchema);
