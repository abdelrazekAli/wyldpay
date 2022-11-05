import "../../../styles/modal.sass";
import { Link } from "react-router-dom";
import { ModalPropsType } from "../../../types/ModalProps";
import { useState, useRef, useEffect, ReactNode } from "react";
import { HashLoader, BeatLoader, BounceLoader } from "react-spinners";

export const Modal = ({ status, enableHide }: ModalPropsType) => {
  const span = useRef(null);
  const modal = useRef(null);
  const [hideModal, setHideModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) => {
    if (e.target === modal.current) {
      enableHide && setHideModal(!hideModal);
    }
  };

  useEffect(() => {
    switch (status) {
      case "success":
        setModalContent(
          <div className="toastContainer">
            <HashLoader color="#061A40" />
            <h3>Thanks!</h3>
            <p>We have received your order</p>
          </div>
        );
        setTimeout(() => {
          window.location.reload();
        }, 5000);
        break;

      case "error":
        setModalContent(
          <div className="toastContainer">
            <BounceLoader color="red" />
            <h3>An error occured!</h3>
            <p>Please ensure that credentials are vaild.</p>
          </div>
        );
        break;

      case "loading":
        setModalContent(
          <div className="toastContainer">
            <BeatLoader color="#4479FB" />
            <h3>We're placing your order</h3>
            <p>Please hold for a moment</p>
          </div>
        );
        break;

      case "subscription-success":
        setModalContent(
          <div className="toastContainer">
            <HashLoader color="#4479FB" />
            <h3>Payment done!</h3>
            <p>
              You can login now to your dashboard from{" "}
              <Link to={"/admin/login"} className="color-main font-bold">
                here
              </Link>
            </p>
          </div>
        );
        break;

      case "subscription-failed":
        setModalContent(
          <div className="toastContainer">
            <BounceLoader color="red" />
            <h3>Payment failed!</h3>
            <p>Please try again later.</p>
          </div>
        );
        break;

      case "no-subscription":
        setModalContent(
          <div className="toastContainer">
            <BounceLoader color="red" />
            <h3>You're not subscribe to menu orders plan!</h3>
            {/* <p>Please subscribe to access orders.</p> */}
          </div>
        );
        break;

      case "password reset":
        setModalContent(
          <div className="toastContainer">
            <HashLoader color="#4479FB" />
            <h3>Password reset successfully!</h3>
            <p>
              You can{" "}
              <Link to={"/admin/login"} className="color-main font-bold">
                login now
              </Link>{" "}
              with your new password
            </p>
          </div>
        );
        break;
      case "send link":
        setModalContent(
          <div className="toastContainer">
            <BeatLoader color="#4479FB" />
            <h3>Link has been sent</h3>
            <p>
              We have send you a password reset link, Please check your mailbox.
            </p>
          </div>
        );
        break;
      default:
        setHideModal(true);
        break;
    }
  }, [status]);

  return (
    <div>
      {!hideModal && (
        <div>
          <div ref={modal} id="myModal" className="modal">
            <div className="modal-content p-relative">
              {enableHide && (
                <span
                  ref={span}
                  onClick={() => setHideModal(true)}
                  className="modal-close"
                >
                  &times;
                </span>
              )}
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
