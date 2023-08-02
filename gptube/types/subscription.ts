export interface Subscription {
  id: string;
  variantId: string;
  name: string;
  description: string;
  period: "monthly" | "yearly";
  benefits: JSX.Element[];
  price: number;
  priceFormatted: number;
  freeTrialDays: number;
}
