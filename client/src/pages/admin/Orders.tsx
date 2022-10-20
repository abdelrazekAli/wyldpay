import Sidebar from "../../components/admin/layouts/Sidebar";
import { Navbar } from "../../components/admin/layouts/Navbar";
import { OrdersTable } from "../../components/admin/dashboard/OrdersTable";

export const Orders = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <OrdersTable />
      </div>
    </>
  );
};
