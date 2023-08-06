import { SubscriptionRequest } from "@/types/billing";
import { ls, storeId } from "@/services";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const subscription: SubscriptionRequest = req.body;

  try {
    const newCheckout = await ls.createCheckout({
      store: storeId,
      variant: subscription.variantId,
      custom_price: subscription.price,
    });
    res.status(200).json({ ...newCheckout });
  } catch (error) {
    res.status(500).json({ error });
  }
}
