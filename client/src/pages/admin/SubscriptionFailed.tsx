import { Navbar } from "../../components/admin/layouts/Navbar";
import { Modal } from "../../components/user/layouts/Modal";

export const SubscriptionFailed = () => {
  return (
    <div>
      <Navbar />
      <Modal status="subscription-failed" />
    </div>
  );
};
