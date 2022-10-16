import axios from "axios";
import "../../../../styles/payments.sass";
import { Modal } from "../../layouts/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTip } from "../../../../redux/tip.slice";
import { useAppSelector } from "../../../../redux/store.hooks";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export const StripePayment = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const tip = useAppSelector(getTip);

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
    navigate("success", { state: tip });

    if (!cardValid) {
      return setError("Please enter a valid card information");
    }
    setError(null);
    setPaymentFailed(false);
    setPaymentLoading(true);
    axios
      .post("/api/v1/payments/stripe/create-payment-intent", {
        amount: totalPrice,
        currency: "eur",
        secretKey: process.env.REACT_APP_STRIPE_SECRET_KEY,
      })
      .then((res) => {
        return stripe?.confirmCardPayment(res.data.clientSecret, {
          payment_method: {
            card: elements?.getElement(CardElement)!,
          },
        });
      })
      .then((result) => {
        if (result?.paymentIntent) {
          setPaymentLoading(false);
          navigate("success", { state: tip });
        } else {
          setPaymentFailed(true);
          setPaymentLoading(false);
          setError("Something went wrong!");
        }
      })
      .catch((err) => {
        setPaymentFailed(true);
        setPaymentLoading(false);
        setError("Something went wrong!");
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
        <div className="error">{error}</div>
        <button onClick={confirmPayment} className="order-btn">
          Order now
        </button>
      </div>
    </div>
  );
};
