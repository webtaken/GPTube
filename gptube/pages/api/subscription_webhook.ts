import crypto from "crypto";
import getRawBody from "raw-body";
import { NextApiRequest, NextApiResponse } from "next";

const webhookPass = process.env.LEMON_WEBHOOK_PASS || "";

const verifySignature = async (req: NextApiRequest) => {
  const secret = webhookPass;
  const hmac = crypto.createHmac("sha256", secret);
  const requestBody = await getRawBody(req.body);
  const signature = req.headers["x-signature"] || "";
  if (typeof signature !== "string") {
    throw new Error("Invalid signature.");
  }
  const digest = Buffer.from(hmac.update(requestBody).digest("hex"), "utf-8");
  const signatureBuffer = Buffer.from(signature, "utf-8");

  if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
    throw new Error("Invalid signature.");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
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
