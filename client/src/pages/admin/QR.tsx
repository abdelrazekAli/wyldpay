import Sidebar from "../../components/admin/layouts/Sidebar";
import { Navbar } from "../../components/admin/layouts/Navbar";
import { TablesQR } from "../../components/admin/dashboard/TablesQR";

export const QR = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <TablesQR />
      </div>
    </>
  );
};
