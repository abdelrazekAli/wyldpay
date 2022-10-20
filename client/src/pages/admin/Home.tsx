import Sidebar from "../../components/admin/layouts/Sidebar";
import { Navbar } from "../../components/admin/layouts/Navbar";
import { Welcome } from "../../components/admin/dashboard/Welcome";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <Welcome />
      </div>
    </>
  );
};
