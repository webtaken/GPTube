const crypto = require("crypto");
const secret = process.env.LEMON_SQUEEZY_WEBHOOK_PASSWORD || "";

const validateSignature = (req) => {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(req.rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(req.get("X-Signature") || "", "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error("Invalid signature.");
  }
};

module.exports = { validateSignature };
