import { Navbar } from "../../components/admin/Navbar";
import { OrdersTable } from "../../components/admin/dashboard/OrdersTable";

export const Orders = () => {
  return (
    <div>
      <Navbar />
      <OrdersTable />
    </div>
  );
};
