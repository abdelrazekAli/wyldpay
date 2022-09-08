import "../styles/modal.sass";
import { ModalPropsType } from "../types/ModalProps";
import { useState, useRef, useEffect, ReactNode } from "react";
import { HashLoader, BeatLoader, BounceLoader } from "react-spinners";

export const Modal = ({ status }: ModalPropsType) => {
  const span = useRef(null);
  const modal = useRef(null);
  const [hideModal, setHideModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) => {
    if (e.target === modal.current) {
      setHideModal(!hideModal);
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
              <span
                ref={span}
                onClick={() => setHideModal(true)}
                className="modal-close"
              >
                &times;
              </span>
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
