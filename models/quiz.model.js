const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  quizName: { type: String, required: "quizname is required" },
  level: { type: String, required: "quiz level must be specified" },
  coverImage: { type: String, required: "cover image link is required" },
  questions: [
    {
      question: { type: String, required: "quiz must have a question" },
      points: {
        type: Number,
        required: "points for each question must be specified",
      },
      negativePoints: {
        type: Number,
        required: "negative points for each question must be specified.",
      },
      options: [
        {
          text: { type: String, required: "option text must be provided" },
          isCorrect: {
            type: Boolean,
            required: "correct answer status must be provided",
          },
        },
      ],
    },
  ],
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = { Quiz };
