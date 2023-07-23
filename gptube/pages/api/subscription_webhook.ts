import crypto from "crypto";
import { LemonsqueezyClient } from "lemonsqueezy.ts";
import { NextApiRequest, NextApiResponse } from "next";

const webhookPass = process.env.LEMON_WEBHOOK_PASS || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const secret = webhookPass;
      const hmac = crypto.createHmac("sha256", secret);
      const requestBody = Array.isArray(req.body)
        ? req.body.join("")
        : JSON.stringify(req.body);

      // Access the X-Signature header directly from the `req.headers` object
      const signature = req.headers["x-signature"];
      if (!signature || typeof signature !== "string") {
        throw new Error("Invalid signature.");
      }

      const digest = Buffer.from(
        hmac.update(requestBody).digest("hex"),
        "utf8"
      );
      const signatureBuffer = Buffer.from(signature, "hex");

      if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
        throw new Error("Invalid signature.");
      }
      console.log(req.body);

      res.status(200);
    } catch (error) {
      res.status(500).json({ error: "Error processing request." });
    }
  }
  res.status(403);
}
