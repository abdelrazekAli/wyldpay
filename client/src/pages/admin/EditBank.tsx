import Sidebar from "../../components/admin/layouts/Sidebar";
import { Navbar } from "../../components/admin/layouts/Navbar";
import { EditBankForm } from "../../components/admin/forms/EditBankForm";

export const EditBank = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <EditBankForm />
      </div>
    </>
  );
};
