const mongoose = require("mongoose");

const LeaderBoardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  score: Number,
});

const LeaderBoard = mongoose.model("LeaderBoard", LeaderBoardSchema);

module.exports = { LeaderBoard };
