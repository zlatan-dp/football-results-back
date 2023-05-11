const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

async function register(req, res, next) {
  const { login, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = await User.create({
      login,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "Created user", user: { login, id: newUser._id } });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      return next(createError(409, `User with email '${login}' already exist`));
    }
    throw error;
  }
}

async function login(req, res, next) {
  const { login, password } = req.body;
  const storedUser = await User.findOne({ login });

  if (!storedUser || !storedUser.comparePassword(password)) {
    return next(createError(401, "Email or password is wrong"));
  }

  return res.json({
    data: {
      token: "token",
    },
  });
}

module.exports = { register, login };