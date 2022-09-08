import axios from "axios";
import { useState } from "react";
import { Modal } from "./Modal";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export const Payment = ({ totalPrice }: { totalPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentFailed, setPaymentFailed] = useState<boolean>(false);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const confirmPayment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPaymentLoading(true);
    axios
      .post("/payment/create", {
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
          setPaymentSuccess(true);
          setPaymentLoading(false);
        } else {
          setPaymentFailed(true);
          setPaymentLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setPaymentLoading(false);
        setPaymentSuccess(false);
        setPaymentFailed(true);
      });
  };

  return (
    <div>
      {paymentLoading && <Modal status="loading" />}
      {paymentSuccess && <Modal status="success" />}
      {paymentFailed && <Modal status="error" />}
      <div>
        <div className="paymentContainer">
          <CardElement
            options={{
              hidePostalCode: true,
              style: {
                base: {
                  iconColor: "#130f40",
                  color: "green",
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
          className="btn"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
