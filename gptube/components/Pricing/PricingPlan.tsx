import { Subscription } from "@/types/subscription";
import { Button } from "antd";
import React from "react";

interface PricingPlanProps {
  subscription: Subscription;
  onSubscribe: () => void;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  subscription,
  onSubscribe,
}) => {
  return (
    <div className="bg-black-full text-typo border border-white-full py-7 px-3 rounded-lg text-center">
      <p className="text-xl font-semibold">{subscription.name}</p>
      <ul className="mt-3 mb-20 text-justify">
        {subscription.benefits.map((benefit, index) => (
          <li key={`benefit-${index}`} className="text-sm">
            ✓ {benefit}
          </li>
        ))}
      </ul>
      <p className="text-4xl">
        <span className="font-medium">${subscription.price}</span>/month
      </p>
      <Button
        className="mt-5 mx-auto primary-button"
        onClick={() => onSubscribe()}
        size="large"
      >
        Subscribe
      </Button>
    </div>
  );
};

export default PricingPlan;
