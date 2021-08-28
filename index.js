require("dotenv").config();
const express = require("express");
const cors = require("cors");
const initializeDbConnection = require("./db/db.connect");

const app = express();
app.use(cors());

const PORT = 4000;

initializeDbConnection();

app.get("/", (req, res) => {
  res.send("Welcome to express app");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
