"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
require("../styles/modal.sass");
const react_1 = require("react");
const react_spinners_1 = require("react-spinners");
const Modal = ({ status }) => {
    const span = (0, react_1.useRef)(null);
    const modal = (0, react_1.useRef)(null);
    const [hideModal, setHideModal] = (0, react_1.useState)(false);
    const [modalContent, setModalContent] = (0, react_1.useState)(null);
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (e) => {
        if (e.target === modal.current) {
            setHideModal(!hideModal);
        }
    };
    (0, react_1.useEffect)(() => {
        switch (status) {
            case "success":
                setModalContent(<div className="toastContainer">
            <react_spinners_1.HashLoader color="#27ae60"/>
            <h3>Thanks!</h3>
            <p>We have received your order</p>
          </div>);
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
                break;
            case "error":
                setModalContent(<div className="toastContainer">
            <react_spinners_1.BounceLoader color="red"/>
            <h3>An error occured!</h3>
            <p>Please ensure that you enter a valid card informations.</p>
          </div>);
                break;
            case "loading":
                setModalContent(<div className="toastContainer">
            <react_spinners_1.BeatLoader color="#27ae60"/>
            <h3>We're placing your order</h3>
            <p>Please hold for a moment</p>
          </div>);
                break;
            default:
                setHideModal(true);
                break;
        }
    }, [status]);
    return (<div>
      {!hideModal && (<div>
          <div ref={modal} id="myModal" className="modal">
            <div className="modal-content p-relative">
              <span ref={span} onClick={() => setHideModal(true)} className="modal-close">
                &times;
              </span>
              {modalContent}
            </div>
          </div>
        </div>)}
    </div>);
};
exports.Modal = Modal;
