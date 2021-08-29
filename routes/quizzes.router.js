const express = require("express");
const router = express.Router();
const { Quiz } = require("../models/quiz.model");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const quizzes = await Quiz.find({});
      res.json({ success: true, quizzes });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Unable to get quizzes, kindly check the error message for more details.",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      const newQuizData = req.body;
      const newQuiz = new Quiz(newQuizData);
      const savedQuiz = await newQuiz.save();
      res.status(201).json({ success: true, quiz: savedQuiz });
    } catch (error) {
      res.status(500).json({
        success: true,
        message:
          "Couldn't create new quiz, kindly check the error message for more details",
        errorMessage: error.message,
      });
    }
  });

router.param("quizId", async (req, res, next, id) => {
  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      res.status(404).json({
        success: false,
        message: "Couldn't find any quiz associated with entered id",
      });
    }

    req.requestedQuiz = quiz;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        "Couldn't find any quiz. Kindly check the error message for more details",
      errorMessage: error.message,
    });
  }
});

router
  .route("/:quizId")
  .get(async (req, res) => {
    try {
      let { requestedQuiz } = req;
      res.status(200).json({ success: true, quiz: requestedQuiz });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Couldn't get requested quiz. Kindly check the error message for more details",
        errorMessage: error.message,
      });
    }
  })
  .post(async (req, res) => {
    try {
      let { requestedQuiz } = req;
      const question = req.body;
      requestedQuiz.questions.push(question);
      const updatedQuiz = await requestedQuiz.save();
      res.status(201).json({ success: true, updatedQuiz });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Couldn't add question to quiz. Kindly check the error message for more details",
        errorMessage: error.message,
      });
    }
  });

module.exports = router;
