import { LemonsqueezyClient } from "lemonsqueezy.ts";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.LEMON_API_KEY;
const storeId = process.env.LEMON_STORE_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subscriptionType } = req.body;
  const variantsIds: Map<string, string> = new Map<string, string>();
  variantsIds.set("hobby", "100776");
  variantsIds.set("popular", "101456");
  const productsPrices: Map<string, number> = new Map<string, number>();
  productsPrices.set("hobby", 1500);
  productsPrices.set("popular", 3000);

  try {
    const client = new LemonsqueezyClient(apiKey || "");
    const newCheckout = await client.createCheckout({
      store: storeId || "",
      variant: variantsIds.get(subscriptionType) || "",
      custom_price: productsPrices.get(subscriptionType) || 0,
    });
    res.status(200).json({ ...newCheckout });
  } catch (error) {
    res.status(500).json({ error });
  }
}
