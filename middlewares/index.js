const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { User } = require("../models/user");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    // console.log(error);
    if (error) {
      return next(createError(400, error.message));
    }
    return next();
  };
}

async function auth(req, res, next) {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw createError(401, "Not authorized 111");
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token) {
      throw createError(401, "Not authorized 222");
    }
    req.user = user;
    next();
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw createError(401, "jwt token is not valid");
    }
    throw error;
  }
}

module.exports = { validateBody, auth };
