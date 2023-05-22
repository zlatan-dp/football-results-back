const { Team } = require("../models/team");
// const createError = require("http-errors");

async function getTeams(req, res, next) {
  const teams = await Team.find({});
  res.json({
    message: "teams found",
    data: teams,
  });
}

module.exports = { getTeams };
