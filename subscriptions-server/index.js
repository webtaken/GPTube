require("dotenv").config({ path: ".env.development" });
const express = require("express");
const webhook_events = require("./handlers/index");
const { validateSignature } = require("./utils");
const app = express();

const port = process.env.PORT || 8001;

// Custom middleware to store the raw body in the request object
app.use(express.raw({ type: "application/json" }));
app.use((req, _res, next) => {
  req.rawBody = req.body;
  next();
});

app.get("/api", (_req, res) => {
  return res.status(200).send("GPTUBE-subscriptions server");
});

app.post("/api/billing/webhooks", async (req, res) => {
  try {
    validateSignature(req);
    const body = JSON.parse(req.body);
    const event_type = body["meta"]["event_name"];
    const handler = webhook_events[`${event_type}`];
    handler && (await handler(body));
    res.status(200).json({ message: "webhook handled" });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

module.exports = app;
