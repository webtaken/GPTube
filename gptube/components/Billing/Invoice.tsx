import React from "react";
import { SubscriptionInvoiceData } from "@/types/billing";
import dayjs from "dayjs";

interface InvoiceProps {
  invoice: SubscriptionInvoiceData;
}

const Invoice: React.FC<InvoiceProps> = ({ invoice }) => {
  return (
    <tr className="hover">
      <th>
        <span className="font-semibold">{invoice.id}</span>
      </th>
      <td>
        <span className="badge badge-outline">{invoice.billingReason}</span>
      </td>
      <td>{dayjs.utc(invoice.createdAt).format("YYYY-MM-DD HH:mm:ss")} UTC</td>
      <td>{`${invoice.total} ${invoice.currency}`}</td>
      <td>
        <span className="badge badge-outline">{invoice.statusFormatted}</span>
      </td>
      <td>
        <a href={invoice.invoiceURL} target="_blank" className="link">
          download
        </a>
      </td>
    </tr>
  );
};
export default Invoice;
