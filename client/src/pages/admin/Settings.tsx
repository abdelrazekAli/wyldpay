import Sidebar from "../../components/admin/layouts/Sidebar";
import { Navbar } from "../../components/admin/layouts/Navbar";
import { SettingsForms } from "../../components/admin/forms/SettingsForms";

export const Settings = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <SettingsForms />
      </div>
    </>
  );
};
