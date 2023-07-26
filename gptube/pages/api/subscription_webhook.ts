export const config = {
  api: {
    bodyParser: false,
  },
};

import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

const webhookPass = process.env.LEMON_WEBHOOK_PASS || "";

// const verifySignature = async (req: NextApiRequest) => {
//   const secret = webhookPass;
//   const hmac = crypto.createHmac("sha256", secret);
//   const requestBody = await getRawBody(req.body);
//   const signature = req.headers["x-signature"] || "";
//   if (typeof signature !== "string") {
//     throw new Error("Invalid signature.");
//   }
//   const digest = Buffer.from(hmac.update(requestBody).digest("hex"), "utf-8");
//   const signatureBuffer = Buffer.from(signature, "utf-8");

//   if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
//     throw new Error("Invalid signature.");
//   }
// };

const verifySignature = (req: NextApiRequest) => {
  return new Promise<void>((resolve, reject) => {
    const secret = webhookPass;
    const hmac = crypto.createHmac("sha256", secret);

    const chunks: Buffer[] = [];
    let requestBodySize = 0;

    req.on("data", (chunk) => {
      chunks.push(chunk);
      requestBodySize += chunk.length;
    });

    req.on("end", () => {
      const requestBody = Buffer.concat(chunks, requestBodySize);
      const signature = req.headers["x-signature"] ?? "";

      if (!signature || typeof signature !== "string") {
        reject(new Error("Invalid signature."));
      }

      const digest = Buffer.from(
        hmac.update(requestBody).digest("hex"),
        "utf-8"
      );
      const signatureBuffer = Buffer.from(
        !Array.isArray(signature) ? signature : "",
        "utf-8"
      );

      console.log(digest.toString());
      console.log(requestBody.toString());

      if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
        reject(new Error("Invalid signature."));
      }

      resolve();
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
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
