import { useState } from "react";
import { Modal } from "../user/Modal";
import "../../styles/forms/payForm.sass";

export const PayForm = () => {
  const [hideModal, setHideModal] = useState<boolean>(true);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setHideModal(false);
  };

  return (
    <div className="pay-form">
      {!hideModal && <Modal status="signup" enableHide={false} />}
      <div className="container">
        <h3>
          Finally let's help you <br /> get paid!
        </h3>
        <p>
          Add your banking details and choose how to handle <br /> the
          processing fees.
        </p>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Bank routing number" />
          <input required type="text" placeholder="Bank account number" />
          <input required type="text" placeholder="Confirm account number" />
          <div className="check">
            <input type="checkbox" name="" />
            <span>
              Check if you want to pass 2.9% + 29 cent charge fee to your
              customer.
            </span>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn">
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
