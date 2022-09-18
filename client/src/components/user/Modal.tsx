import "../../styles/modal.sass";
import { ModalPropsType } from "../../types/ModalProps";
import { useState, useRef, useEffect, ReactNode } from "react";
import { HashLoader, BeatLoader, BounceLoader } from "react-spinners";
import { Link } from "react-router-dom";

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
            <HashLoader color="#27ae60" />
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
            <p>Please ensure that you enter a valid card informations.</p>
          </div>
        );
        break;

      case "loading":
        setModalContent(
          <div className="toastContainer">
            <BeatLoader color="#27ae60" />
            <h3>We're placing your order</h3>
            <p>Please hold for a moment</p>
          </div>
        );
        break;

      case "signup":
        setModalContent(
          <div className="toastContainer">
            <HashLoader color="#27ae60" />
            <h3>All done!</h3>
            <p>We will redirect you now to your dashboard</p>
          </div>
        );
        break;

      case "password reset":
        setModalContent(
          <div className="toastContainer">
            <HashLoader color="#27ae60" />
            <h3>Password reset successfully!</h3>
            <p>
              You can{" "}
              <Link to={"/admin/login"} className="color-green font-bold">
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
            <BeatLoader color="#27ae60" />
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
