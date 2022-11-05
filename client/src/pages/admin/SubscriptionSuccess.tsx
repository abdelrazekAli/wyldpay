import { Navbar } from "../../components/admin/layouts/Navbar";
import { Modal } from "../../components/user/layouts/Modal";

export const SubscriptionSuccess = () => {
  return (
    <div>
      <Navbar />
      <Modal status="subscription-success" />
    </div>
  );
};
