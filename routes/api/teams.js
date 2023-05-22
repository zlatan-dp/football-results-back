const express = require("express");

const { tryCatchWrapper } = require("../../helpers/index");
// const { validateBody } = require("../../middlewares");

const teamRouter = express.Router();

const { getTeams } = require("../../controllers/teams.controllers");

teamRouter.get("/", tryCatchWrapper(getTeams));

module.exports = { teamRouter };
