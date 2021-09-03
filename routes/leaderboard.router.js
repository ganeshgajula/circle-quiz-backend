const express = require("express");
const router = express.Router();
const { LeaderBoard } = require("../models/leaderboard.model");
const { User } = require("../models/user.model");

router.route("/").get(async (req, res) => {
  try {
    const leaderBoardScores = await LeaderBoard.find({}).populate({
      path: "userId quizId",
      select: "firstname lastname quizName",
    });

    const sortedLeaderBoard = leaderBoardScores.sort(
      (a, b) => b.score - a.score
    );

    const leaderBoardToppers = sortedLeaderBoard.slice(0, 5);

    res.json({
      success: true,
      leaderBoardToppers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Couldn't fetch leaderboard, kindly check the error message for more details",
      errorMessage: error.message,
    });
  }
});

router.param("userId", async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "No user found with entered id" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Couldn't find user associated with entered id",
      errorMessage: error.message,
    });
  }
});

router.route("/:userId").post(async (req, res) => {
  try {
    let { user } = req;
    const newScoreData = req.body;
    const newScoreEntry = new LeaderBoard({
      userId: user._id,
      quizId: newScoreData.quizId,
      score: newScoreData.score,
    });
    let savedScore = await newScoreEntry.save();
    savedScore = await savedScore.populate({
      path: "userId quizId",
      select: "firstname lastname quizName",
    });

    res.status(201).json({ success: true, leaderBoard: savedScore });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Couldn't add score onto leaderboard",
      errorMessage: error.message,
    });
  }
});

module.exports = router;
