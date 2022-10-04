import axios from "axios";
import { useState } from "react";
import { Modal } from "../../Modal";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export const StripePayment = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [paymentFailed, setPaymentFailed] = useState<boolean>(false);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const confirmPayment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
          navigate("success");
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
      {paymentLoading && <Modal status="loading" enableHide />}
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
              },
              iconStyle: "solid",
            }}
          />
        </div>
        <button
          disabled={paymentLoading}
          onClick={confirmPayment}
          className="order-btn"
        >
          Order now
        </button>
      </div>
    </div>
  );
};
