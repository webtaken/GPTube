import { GO_API_ENDPOINT } from "@/services";
import { SubscriptionData, SubscriptionInvoiceData } from "@/types/billing";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../UI/Loading";
import Invoices from "./InvoicesTable";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface SubscriptionProps {
  subscription: SubscriptionData;
}

const Subscription: React.FC<SubscriptionProps> = ({ subscription }) => {
  const [showInvoices, setShowInvoices] = useState(false);
  const [pageInvoices, setPageInvoices] = useState(1);
  const [loadedInvoices, setLoadedInvoices] = useState(false);
  const [invoices, setInvoices] = useState<SubscriptionInvoiceData[]>([]);
  const [totalInvoices, setTotalInvoices] = useState(0);

  const pageSize = 10;

  const updatePaymentMethodHandler = async () => {
    const baseUrl = "/api/update-payment-method";
    const queryParams = new URLSearchParams({
      subscriptionId: String(subscription.subscriptionId),
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
    try {
      const response = await fetch(`${GO_API_ENDPOINT}/billing/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId: +subscription.subscriptionId,
          page: page,
          pageSize: pageSize,
        }),
      });

      if (!response.ok)
        throw new Error(
          `Invoices retrieval failed!, status code ${response.status}`
        );

      const invoices = await response.json();
      console.log(invoices);
      const formattedInvoices: SubscriptionInvoiceData[] = invoices.data.map(
        (invoiceObject: { [x: string]: any }) => {
          const invoiceAttributes = invoiceObject["attributes"];
          return {
            id: invoiceObject["id"],
            billingReason: invoiceAttributes["billing_reason"],
            total: invoiceAttributes["total"],
            currency: invoiceAttributes["currency"],
            status: invoiceAttributes["status"],
            statusFormatted: invoiceAttributes["status_formatted"],
            invoiceURL: invoiceAttributes["urls"]["invoice_url"],
            createdAt: invoiceAttributes["created_at"],
            updatedAt: invoiceAttributes["updated_at"],
          };
        }
      );
      setPageInvoices(page);
      setLoadedInvoices(true);
      setInvoices(formattedInvoices);
    } catch (error) {
      setLoadedInvoices(true);
      toast.error(`${String(error)}`);
    }
  };

  useEffect(() => {
    if (showInvoices) {
      console.log("retrieving invoices...");
      showInvoicesHandler(pageInvoices);
    }
  }, [showInvoices]);

  return (
    <>
      <div className="bg-black-medium w-full rounded-xl p-8 text-typo">
        <Toaster />
        <h2 className="card-title">{subscription.productName}</h2>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          {subscription.statusFormatted}
        </p>
        <p>
          <span className="font-semibold">Started at:</span>{" "}
          {dayjs.utc(subscription.createdAt).format("YYYY-MM-DD HH:mm:ss")} UTC
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
          <button
            className="btn"
            onClick={() => setShowInvoices((prev) => !prev)}
          >
            {showInvoices ? "Hide Invoices" : "Show invoices"}
          </button>
          <button className="btn" onClick={() => updatePaymentMethodHandler()}>
            Update payment method
          </button>
        </div>
      </div>
      {showInvoices && loadedInvoices && <Invoices invoices={invoices} />}
      {showInvoices && !loadedInvoices && <Loading className="my-4" />}
    </>
  );
};

export default Subscription;
