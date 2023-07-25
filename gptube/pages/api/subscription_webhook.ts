import crypto from "crypto";
import { LemonsqueezyClient } from "lemonsqueezy.ts";
import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from "body-parser";

// Custom middleware to store the raw body in req.rawBody
function rawBodyMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  if (!req.rawBody) {
    req.setEncoding("utf8");
    req.rawBody = "";

    req.on("data", function (chunk: string) {
      req.rawBody += chunk;
    });

    req.on("end", function () {
      next();
    });
  } else {
    next();
  }
}

const webhookPass = process.env.LEMON_WEBHOOK_PASS || "";

const verifySignature = (req: NextApiRequest) => {
  const secret = webhookPass;
  const hmac = crypto.createHmac("sha256", secret);
  const requestBody = JSON.stringify(req.body);
  console.log(req.headers);
  const signature = req.headers["x-signature"] || "";
  if (!signature || typeof signature !== "string") {
    throw new Error("Invalid signature.");
  }
  const digest = Buffer.from(hmac.update(requestBody).digest("hex"), "utf-8");
  const signatureBuffer = Buffer.from(signature, "utf-8");
  console.log(
    `digest: ${digest.toString()}\nsignature: ${signatureBuffer.toString()}`
  );
  if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
    throw new Error("Invalid signature.");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Add the custom middleware to parse raw body
    bodyParser.urlencoded({ extended: true })(req, res, function () {
      // Access the raw body as req.rawBody
      console.log(req.rawBody);

      // Rest of your logic
      res.status(200).json({ message: "Request received successfully." });
    });
    try {
      verifySignature(req);
      console.log(req.body);
      res.status(200);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }
      res.status(500).json({ error });
    }
    return;
  }
  res.status(403);
}
