import axios from "axios";
import { useState } from "react";
import { getUser } from "../../../redux/user.slice";
import { useAppSelector } from "../../../redux/store.hooks";

export const PaypalKeysForm = ({ hideForm }: { hideForm: () => void }) => {
  const { accessToken } = useAppSelector(getUser);

  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Handle update payment keys
  const editPaymentKeys = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);

    try {
      await axios.put(
        "/api/v1/banks/methods",
        {
          name: "paypal",
          publicKey: publicKey,
          secretKey: secretKey,
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      hideForm();
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  return (
    <div id="myModal" className="modal form-modal">
      <div className="modal-content p-relative custom-content">
        <span onClick={hideForm} className="modal-close">
          &times;
        </span>
        <div className="main-content">
          <div className="card">
            <div className="img">
              <img src="../../assets/images/paypal-logo.png" alt="" />
            </div>
          </div>
          <form onSubmit={editPaymentKeys}>
            <input
              type="text"
              placeholder="Public key"
              onChange={(e) => setPublicKey(e.target.value)}
            />
            <input
              type="password"
              placeholder="Secret key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <button
              disabled={!publicKey || !secretKey}
              type="submit"
              className="btn"
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </form>
        </div>
        {error && (
          <span className="color-error text-center fs-2 my-1">{error}</span>
        )}
      </div>
    </div>
  );
};
