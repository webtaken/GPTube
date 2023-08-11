import { SubscriptionRequest } from "@/types/billing";
import { Button } from "antd";
import React from "react";

interface PricingPlanProps {
  subscription: SubscriptionRequest;
  loadingCheckout: boolean;
  onSubscribe: () => void;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  subscription,
  loadingCheckout,
  onSubscribe,
}) => {
  return (
    <div className="bg-black-full text-typo border border-white-full py-7 px-3 rounded-lg text-center w-80">
      <p className="text-xl font-semibold">{subscription.name}</p>
      <p className="text-sm my-4">{subscription.description}</p>
      <ul className="mt-3 mb-20">
        {subscription.benefits.map((benefit, index) => (
          <li key={`benefit-${index}`} className="text-sm text-center">
            ✓ {benefit}
          </li>
        ))}
      </ul>
      <p className="text-4xl">
        <span className="font-medium">${subscription.priceFormatted}</span>/
        {subscription.period === "monthly" ? "month" : "year"}
      </p>
      <Button
        className="mt-5 mx-auto primary-button"
        onClick={() => onSubscribe()}
        size="large"
        loading={loadingCheckout}
      >
        Subscribe
      </Button>
    </div>
  );
};

export default PricingPlan;
