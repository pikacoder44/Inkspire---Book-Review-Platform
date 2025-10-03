const model = require("mongoose").model;
const schema = require("mongoose").Schema;
const bcrypt = require("bcryptjs");

const userSchema = new schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reviews: [{ type: schema.Types.ObjectId, ref: "Review" }],
});

const saltRounds = 10;

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = model("User", userSchema);
