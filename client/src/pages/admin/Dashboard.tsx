import { Welcome } from "../../components/admin/dashboard/Welcome";
import { Navbar } from "../../components/admin/layouts/Navbar";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Welcome />
    </div>
  );
};
