import React from "react";
import { SubscriptionInvoiceData } from "@/types/billing";
import Invoice from "./Invoice";

interface InvoicesTableProps {
  invoices: SubscriptionInvoiceData[];
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ invoices }) => {
  return (
    <div>
      <div className="my-4 overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>ID</th>
              <th>Billing Reason</th>
              <th>Created At</th>
              <th>Total</th>
              <th>Status</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              return <Invoice key={invoice.id} invoice={invoice} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center">
        <button className="btn">Button</button>
        <button className="btn">Button</button>
      </div>
    </div>
  );
};
export default InvoicesTable;
