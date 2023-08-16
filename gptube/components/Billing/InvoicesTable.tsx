import React from "react";
import { SubscriptionInvoiceData } from "@/types/billing";
import Invoice from "./Invoice";

interface InvoicesTableProps {
  invoices: SubscriptionInvoiceData[];
  currentPage: number;
  totalInvoices: number;
  lastPage: number;
  nextPage: () => void;
  prevPage: () => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({
  invoices,
  currentPage,
  totalInvoices,
  lastPage,
  nextPage,
  prevPage,
}) => {
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
      <p className="text-center">You have {totalInvoices} invoices</p>
      <div className="flex items-center justify-center gap-2">
        <button
          className={`btn btn-sm ${currentPage <= 1 && "btn-disabled"}`}
          onClick={() => prevPage()}
        >
          Prev
        </button>
        <button
          className={`btn btn-sm ${currentPage >= lastPage && "btn-disabled"}`}
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default InvoicesTable;
