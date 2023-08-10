export interface SubscriptionRequest {
  id: number;
  variantId: number;
  name: string;
  description: string;
  period: "monthly" | "yearly";
  benefits: JSX.Element[];
  price: number;
  priceFormatted: number;
  freeTrialDays: number;
}

export interface SubscriptionData {
  subscriptionId: number;
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

export interface SubscriptionInvoiceData {
  id: number;
  billingReason: string;
  total: number;
  currency: string;
  totalFormatted: string;
  status: string;
  statusFormatted: string;
  invoiceURL: string;
  createdAt: string;
  updatedAt: string;
}
