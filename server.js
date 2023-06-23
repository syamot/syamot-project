const express = require("express");
const knex = require("./db/knex");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static("build"));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("接続完了しました。");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
