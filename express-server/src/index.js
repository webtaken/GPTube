const express = require("express")
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (_req, res) => {
  return res.send("Express on Vercel");
});

app.get("/ping", (_req, res) => {
  return res.send("pong 🏓");
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

module.exports = app;
