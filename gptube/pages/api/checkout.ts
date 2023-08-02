import { Subscription } from "@/types/subscription";
import { LemonsqueezyClient } from "lemonsqueezy.ts";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.LEMON_API_KEY || "";
const storeId = process.env.LEMON_STORE_ID || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const subscription: Subscription = req.body;

  try {
    const client = new LemonsqueezyClient(apiKey);
    const newCheckout = await client.createCheckout({
      store: storeId,
      variant: subscription.variantId,
      custom_price: subscription.price,
    });
    res.status(200).json({ ...newCheckout });
  } catch (error) {
    res.status(500).json({ error });
  }
}
