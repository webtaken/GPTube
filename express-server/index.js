require("dotenv").config();
const express = require("express");
const { validateSignature } = require("./utils.js");
const app = express();
const port = process.env.PORT || 8080;

// Custom middleware to store the raw body in the request object
app.use(express.raw({ type: "application/json" }));
app.use((req, _res, next) => {
  req.rawBody = req.body;
  next();
});

app.get("/", (_req, res) => {
  return res.send("GPTUBE-subscriptions server");
});

app.post("/subscriptions", async (req, res) => {
  try {
    validateSignature(req);
    const body = JSON.parse(req.body);
    console.log(JSON.stringify(body, null, 2));
    res.status(200).json({ message: "success subscription_created" });
  } catch (error) {
    res.status(500).json({ ...error });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

module.exports = app;
