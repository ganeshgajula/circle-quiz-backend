require("dotenv").config();
const express = require("express");
const cors = require("cors");
const quizzes = require("./routes/quizzes.router");
const initializeDbConnection = require("./db/db.connect");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;
initializeDbConnection();

app.use("/quizzes", quizzes);

app.get("/", (req, res) => {
  res.send("Welcome to Circle Quiz!");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
