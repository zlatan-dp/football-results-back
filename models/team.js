const { Schema, model } = require("mongoose");

const teamSchema = Schema(
  {
    team: {
      type: String,
      required: true,
    },
    results: {
      wins: {
        type: Number,
        required: true,
      },
      draws: {
        type: Number,
        required: true,
      },
      losses: {
        type: Number,
        required: true,
      },
      goalsFor: {
        type: Number,
        required: true,
      },
      goalsAgainst: {
        type: Number,
        required: true,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Team = model("team", teamSchema);

module.exports = { Team };
