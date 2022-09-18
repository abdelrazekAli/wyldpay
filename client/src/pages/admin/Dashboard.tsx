import { Navbar } from "../../components/admin/Navbar";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <h1
        style={{
          color: "130f40",
          textAlign: "center",
          margin: "4rem",
          fontSize: "3rem",
        }}
      >
        Welcome to dashboard
      </h1>
    </div>
  );
};
