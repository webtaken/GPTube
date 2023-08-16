import { MyPage } from "@/components/Common/Types";
import { useAuth } from "@/context/AuthContext";
import { SubscriptionData } from "@/types/billing";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Subscription from "@/components/Billing/Subscription";
import Loading from "@/components/UI/Loading";
import { GO_API_ENDPOINT } from "@/services";

const Billing: MyPage = () => {
  const [activeSubscription, setActiveSubscription] =
    useState<SubscriptionData>({} as SubscriptionData);
  const [subscriptions, setSubscriptions] = useState<SubscriptionData[]>([]);
  const [loadedSubscriptions, setLoadedSubscriptions] = useState(false);
  const { user } = useAuth();

  const retrieveSubscriptions = async () => {
    setLoadedSubscriptions(false);
    const baseUrl = `${GO_API_ENDPOINT}/billing/subscriptions`;
    const queryParams = new URLSearchParams({
      user_email: user?.email ?? "",
    });

    const url = `${baseUrl}?${queryParams}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("");
      const data = await response.json();
      const newSubs: SubscriptionData[] = data.subscriptions.map(
        (sub: { [x: string]: any }) => {
          return {
            subscriptionId: sub["subscription_id"],
            productName: sub["product_name"],
            cardBrand: sub["card_brand"],
            cardLastFour: sub["card_last_four"],
            customerId: sub["customer_id"],
            endsAt: sub["ends_at"],
            createdAt: sub["created_at"],
            orderId: sub["order_id"],
            productId: sub["product_id"],
            variantId: sub["variant_id"],
            renewsAt: sub["renews_at"],
            status: sub["status"],
            statusFormatted: sub["status_formatted"],
            trialEndsAt: sub["trial_ends_at"],
            updatePaymentMethod: sub["update_payment_method"],
            userEmail: sub["update_payment_method"],
          };
        }
      );
      setSubscriptions([...newSubs]);
      setActiveSubscription({ ...newSubs[0] });
      setLoadedSubscriptions(true);
    } catch (error) {
      toast.error(
        "Couldn't fetch the subscriptions. Try again later or communicate with @node_srojas1 on X."
      );
    }
  };

  useEffect(() => {
    retrieveSubscriptions();
  }, []);

  return (
    <div className="mx-8">
      <h2 className="text-2xl text-typo">Billing</h2>
      {loadedSubscriptions ? (
        <>
          <div className="mt-2 tabs">
            {subscriptions.map((sub) => {
              return (
                <a
                  className={`text-typo tab tab-bordered ${
                    sub.subscriptionId === activeSubscription.subscriptionId &&
                    "tab-active"
                  }`}
                  key={sub.subscriptionId}
                  onClick={() => {
                    setActiveSubscription({ ...sub });
                  }}
                >
                  {sub.productName} subscription
                </a>
              );
            })}
          </div>
          <div className="py-4">
            <Subscription subscription={activeSubscription} />
          </div>
        </>
      ) : (
        <Loading className="my-4" />
      )}
    </div>
  );
};

export default Billing;
Billing.Layout = "Admin";
