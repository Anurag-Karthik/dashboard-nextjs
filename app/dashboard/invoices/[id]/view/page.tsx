import { fetchCustomersList, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  console.log("Fetching invoice with id:", id);

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomersList(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200">
      
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Invoice #{id}
        </h3>

        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            invoice.status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Customer ID:</span>{" "}
          {invoice.customer_id}
        </p>

        <p>
          <span className="font-medium text-gray-700">Amount:</span> $
          {invoice.amount}
        </p>
      </div>
    </div>
  );
}
