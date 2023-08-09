import { SubscriptionData } from "@/types/billing";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

interface SubscriptionProps {
  subscription: SubscriptionData;
}

const Subscription: React.FC<SubscriptionProps> = ({ subscription }) => {
  const [showInvoices, setShowInvoices] = useState(false);
  const [pageInvoices, setPageInvoices] = useState(1);
  const [loadedInvoices, setLoadedInvoices] = useState(false);

  const pageSize = 10;

  const updatePaymentMethodHandler = async () => {
    const baseUrl = "/api/update-payment-method";
    const queryParams = new URLSearchParams({
      subscriptionId: subscription.subscriptionId,
    });
    const url = `${baseUrl}?${queryParams}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      window.open(data["update_payment_method_url"], "_blank");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const showInvoicesHandler = async (page: number) => {
    setLoadedInvoices(false);
    setPageInvoices(page);
  };

  useEffect(() => {
    if (showInvoices) {
      showInvoicesHandler(pageInvoices);
    }
  }, [showInvoices]);

  return (
    <div className="bg-black-medium w-full rounded-xl p-8 text-typo">
      <Toaster />
      <h2 className="card-title">{subscription.productName}</h2>
      <p>
        <span className="font-semibold">Status:</span>{" "}
        {subscription.statusFormatted}
      </p>
      <p>
        <span className="font-semibold">Started at:</span>{" "}
        {new Date(subscription.createdAt).toString()}
      </p>
      <div className="border my-4 bg-black-full p-4 rounded-xl">
        <h2 className="card-title">Payment method</h2>
        <p>
          <span className="font-semibold">Card: </span> XXXX...
          {subscription.cardLastFour}
        </p>
        <p>
          <span className="font-semibold">Card brand: </span>{" "}
          {subscription.cardBrand}
        </p>
      </div>
      <div className="card-actions justify-end">
        <button className="btn" onClick={() => setSh()}>
          Show invoices
        </button>
        <button className="btn" onClick={() => updatePaymentMethodHandler()}>
          Update payment method
        </button>
      </div>
    </div>
  );
};

export default Subscription;
