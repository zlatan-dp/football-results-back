const express = require(`express`);

const { tryCatchWrapper } = require("../../helpers/index");
const { auth } = require("../../middlewares/index");
const { getCurrent } = require("../../controllers/users.controllers");
const usersRouter = express.Router();

usersRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(getCurrent));

module.exports = { usersRouter };
