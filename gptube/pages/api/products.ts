import { LemonsqueezyClient } from "lemonsqueezy.ts";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.LEMON_API_KEY || "";
const storeId = process.env.LEMON_STORE_ID || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = new LemonsqueezyClient(apiKey);
    const products = await client.listAllProducts({ storeId: storeId });
    res.status(200).json({ ...products });
  } catch (error) {
    res.status(500).json({ error });
  }
}
