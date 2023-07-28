require("dotenv").config();
const express = require("express");
const crypto = require("crypto");
const app = express();
const port = process.env.PORT || 8080;
const secret = process.env.LEMON_WEBHOOK_PASS || "";

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
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(req.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    const body = JSON.parse(req.body);
    console.log(JSON.stringify(body, null, 2));
    res.status(200).json({ ...body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ...error });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

module.exports = app;
