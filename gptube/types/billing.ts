export interface SubscriptionRequest {
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

export interface SubscriptionData {
  subscriptionId: string;
  productName: string;
  cardBrand: string;
  cardLastFour: string;
  customerId: number;
  endsAt: string;
  orderId: number;
  productId: number;
  variantId: number;
  renewsAt: string;
  createdAt: string;
  status: string;
  statusFormatted: string;
  trialEndsAt: string;
  updatePaymentMethod: string;
  userEmail: string;
}
