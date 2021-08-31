const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: "first name is required" },
    lastname: { type: String, require: "last name is required" },
    email: { type: String, required: "email is required" },
    password: { type: String, required: "password is required" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
