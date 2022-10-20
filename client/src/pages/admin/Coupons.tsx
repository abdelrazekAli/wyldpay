import Sidebar from "../../components/admin/layouts/Sidebar";
import { Navbar } from "../../components/admin/layouts/Navbar";
import { CouponsTable } from "../../components/admin/dashboard/CouponsTable";

export const Coupons = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <CouponsTable />
      </div>
    </>
  );
};
