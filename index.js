require("dotenv").config();
const express = require("express");
const cors = require("cors");
const users = require("./routes/users.router");
const quizzes = require("./routes/quizzes.router");
const leaderboard = require("./routes/leaderboard.router");
const initializeDbConnection = require("./db/db.connect");
const { errorHandler } = require("./middlewares/errorHandler");
const { routeHandler } = require("./middlewares/routeHandler");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;
initializeDbConnection();

app.use("/users", users);
app.use("/quizzes", quizzes);
app.use("/leaderboard", leaderboard);

app.get("/", (req, res) => {
  res.send("Welcome to Circle Quiz!");
});

/**
 * 404 Route Handler
 * Note: Do not move. This should be the last route
 */
app.use(routeHandler);

/**
 * Error Handler
 * Note: Do not move
 */
app.use(errorHandler);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
