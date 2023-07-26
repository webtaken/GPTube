require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const secret = process.env.LEMON_WEBHOOK_PASS || "";

app.get("/", (_req, res) => {
  return res.send("GPTUBE-subscriptions server");
});

app.get(
  "/subscriptions",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(request.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }
    const body = JSON.parse(req.body);
    res.json({ ...body });
  }
);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

module.exports = app;
