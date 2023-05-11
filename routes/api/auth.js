const express = require(`express`);

const { register, login } = require("../../controllers/auth.controllers");
const { tryCatchWrapper } = require("../../helpers/index");

const authRouter = express.Router();

authRouter.post("/register", tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(login));

module.exports = { authRouter };
