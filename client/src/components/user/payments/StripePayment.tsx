import axios from "axios";
import { Modal } from "../layouts/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export const StripePayment = ({
  totalPrice,
  tip,
}: {
  totalPrice: number;
  tip: number | null;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [cardValid, setCardValid] = useState<boolean>(false);
  const [paymentFailed, setPaymentFailed] = useState<boolean>(false);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  // Check if card valid before submit
  useEffect(() => {
    const cardElement = elements?.getElement("card") || null;
    if (cardElement) {
      cardElement.focus();
      cardElement.on("change", function (event) {
        setError(null);
        if (event.complete) {
          setCardValid(true);
        } else if (event.error || event.empty) {
          setCardValid(false);
        }
      });
    }
  }, [elements]);

  const confirmPayment = async () => {
    if (!cardValid) {
      return setError("Please enter a valid card information");
    }
    setError(null);
    setPaymentFailed(false);
    setPaymentLoading(true);
    axios
      .post("/api/v1/payment/stripe/create", {
        amount: totalPrice,
      })
      .then((data) => {
        return stripe?.confirmCardPayment(data.data.clientSecret, {
          payment_method: {
            card: elements?.getElement(CardElement)!,
          },
        });
      })
      .then((result) => {
        if (result?.paymentIntent) {
          navigate("success", { state: tip });
          setPaymentLoading(false);
        } else {
          setPaymentFailed(true);
          setPaymentLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setPaymentLoading(false);
        setPaymentFailed(true);
      });
  };

  return (
    <div>
      {paymentLoading && <Modal status="loading" />}
      {paymentFailed && <Modal status="error" enableHide />}
      <div className="stripe-payment">
        <div className="stripe-payment-container">
          <CardElement
            options={{
              hidePostalCode: true,
              hideIcon: true,
              style: {
                base: {
                  color: "#061A40",
                  fontSize: "1.1rem",
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
              iconStyle: "solid",
            }}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button onClick={confirmPayment} className="order-btn">
          Order now
        </button>
      </div>
    </div>
  );
};
