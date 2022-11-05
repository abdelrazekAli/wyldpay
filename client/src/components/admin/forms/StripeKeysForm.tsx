import axios from "axios";
import { useEffect, useState } from "react";
import { getUser } from "../../../redux/user.slice";
import { CircularProgress } from "@material-ui/core";
import { useAppSelector } from "../../../redux/store.hooks";
import { PaymentMethod } from "../../../types/PaymentMethod";

export const StripeKeysForm = ({ hideForm }: { hideForm: () => void }) => {
  const { _id, accessToken } = useAppSelector(getUser);

  const [paymentsMethod, setPaymentsMethod] = useState<PaymentMethod>({
    name: "stripe",
    publicKey: "",
    secretKey: "",
  });

  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await axios.get(`/api/v1/banks/${_id}`);
        console.log(res);
        setPaymentsMethod(
          res.data.paymentsMethods.filter(
            (method: PaymentMethod) => method.name === "stripe"
          )[0]
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
        setError("Something went wrong!");
      }
    };
    fetchMethods();
  }, [_id]);

  // Handle update payment keys
  const editPaymentKeys = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.put(
        "/api/v1/banks/methods",
        {
          name: "stripe",
          publicKey: paymentsMethod?.publicKey,
          secretKey: paymentsMethod?.secretKey,
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      setSuccess("Keys updated successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
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
              <img src="../../assets/images/stripe-logo.png" alt="" />
            </div>
          </div>

          {!isLoading ? (
            <form onSubmit={editPaymentKeys} autoComplete="off">
              <input
                id="publicKey"
                name="publicKey"
                type="text"
                placeholder="Public key"
                value={paymentsMethod?.publicKey}
                autoComplete="off"
                onChange={(e) =>
                  setPaymentsMethod({
                    ...paymentsMethod,
                    publicKey: e.target.value.trim(),
                  })
                }
              />
              <input
                id="secretKey"
                name="secretKey"
                type="password"
                placeholder="Secret key"
                value={paymentsMethod?.secretKey}
                autoComplete="off"
                className="mb-0"
                onChange={(e) =>
                  setPaymentsMethod({
                    ...paymentsMethod,
                    secretKey: e.target.value.trim(),
                  })
                }
              />
              <span className="instructions">
                Note: you can get your keys from{" "}
                <a
                  href="https://dashboard.stripe.com/apikeys"
                  target="_blank"
                  className="color-main text-underline"
                >
                  <b>here</b>
                </a>
              </span>
              <button type="submit" className="btn">
                {isLoading ? "Loading..." : "Save"}
              </button>
            </form>
          ) : (
            <div className="p-5 text-center">
              <CircularProgress color="inherit" size="25px" />
            </div>
          )}
        </div>
        <span className="color-error text-center fs-2 mt-1">{error}</span>
        <span className="color-main text-center fs-2 mt-1">{success}</span>
      </div>
    </div>
  );
};
