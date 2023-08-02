import React, { useEffect, useState } from "react";
import { MyPage } from "@/components/Common/Types";
import PricingPlan from "@/components/Pricing/PricingPlan";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Subscription } from "@/types/subscription";
import { toast, Toaster } from "react-hot-toast";
import { subscriptionsDev } from "@/utils/common";

const Subscriptions: MyPage = () => {
  const [monthly, setMonthly] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const onSubscribeHandler = async (sub: Subscription) => {
    if (!user) {
      router.push({
        pathname: "/login",
        query: { from: "pricing" },
      });
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sub),
      });
      const checkout = await response.json();
      window.open(checkout["data"]["attributes"]["url"], "_blank");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <>
      <Toaster />
      <p className="text-5xl font-semibold text-typo text-center">
        Pricing Plans
      </p>
      <div className="flex items-center justify-center gap-4 my-5">
        <p className="text-base">Monthly</p>
        <input
          type="checkbox"
          className="toggle toggle-md"
          onChange={() => {
            setMonthly(!monthly);
          }}
          checked={!monthly}
        />
        <p className="text-base">Yearly</p>
      </div>
      <p className="text-typo text-xl text-center font-semibold">
        Free trial {subscriptionsDev[0].freeTrialDays} days
      </p>
      <div className="flex items-stretch justify-center gap-32 my-10">
        {subscriptionsDev
          .filter((sub) =>
            monthly ? sub.period === "monthly" : sub.period === "yearly"
          )
          .map((sub) => {
            return (
              <PricingPlan
                key={`sub-${sub.id}`}
                subscription={sub}
                onSubscribe={() => onSubscribeHandler(sub)}
              />
            );
          })}
      </div>
    </>
  );
};

export default Subscriptions;
Subscriptions.Layout = "Admin";
