const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    login: {
      type: String,
      unique: true,
      required: [true, "Login is required"],
    },
    password: {
      type: String,
      minLength: [6, "password should be at least 6 characters long"],
      required: [true, "Password is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

module.exports = { User };
