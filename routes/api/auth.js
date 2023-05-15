const express = require(`express`);

const {
  register,
  login,
  logout,
} = require("../../controllers/auth.controllers");
const { tryCatchWrapper } = require("../../helpers/index");
const { validateBody, auth } = require("../../middlewares");

const { joiRegSchema, joiLogSchema } = require("../../schemas/users");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(joiRegSchema),
  tryCatchWrapper(register)
);

authRouter.post("/login", validateBody(joiLogSchema), tryCatchWrapper(login));

authRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));

module.exports = { authRouter };
