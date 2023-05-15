const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

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

  const payload = {
    id: storedUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });
  await User.findByIdAndUpdate(storedUser._id, { token });

  return res.json({
    data: {
      token,
    },
  });
}

async function logout(req, res, next) {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
}

module.exports = { register, login, logout };
