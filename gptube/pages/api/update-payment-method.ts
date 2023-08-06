import { NextApiRequest, NextApiResponse } from "next";
import { ls } from "@/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const subscriptionId = req.query.subscriptionId;
  if (!subscriptionId || subscriptionId === "")
    throw new Error("No provided subscription ID");
  try {
    const subscription = await ls.retrieveSubscription({
      id: `${subscriptionId}`,
    });
    res.status(200).json({
      update_payment_method_url:
        subscription.data.attributes.urls.update_payment_method,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}
