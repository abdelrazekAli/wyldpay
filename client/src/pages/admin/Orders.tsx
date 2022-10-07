import { Navbar } from "../../components/admin/layouts/Navbar";
import { OrdersTable } from "../../components/admin/dashboard/OrdersTable";

export const Orders = () => {
  return (
    <div>
      <Navbar />
      <OrdersTable />
    </div>
  );
};
