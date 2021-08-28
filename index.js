const express = require("express");
const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Welcome to express app");
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
