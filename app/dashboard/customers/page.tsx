import { fetchCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";

export const dynamic = "force-dynamic";

export default async function Page() {
  const customers = await fetchCustomers();
  
  return (
    <main>
      <CustomersTable customers={customers} />
    </main>
  );
}