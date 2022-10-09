import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export const ApplePayment = ({
  totalPrice,
  tip,
}: {
  totalPrice: number;
  tip: number | null;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState<any | null>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentRequest, setPaymentRequest] = useState<any>();

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "total",
        amount: totalPrice,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on("paymentmethod", async (e) => {
      await axios
        .post("/api/v1/payments/stripe/create-payment-intent", {
          amount: totalPrice,
          currency: "eur",
          secretKey: process.env.REACT_APP_STRIPE_SECRET_KEY,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          setError("Something went wrong!");
          return;
        });

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: e.paymentMethod.id,
          },
          { handleActions: false }
        );

      if (stripeError) {
        // Show error
        setError(stripeError.message);
        return;
      }

      // if success
      navigate("success", { state: tip });
    });
  }, [stripe, elements]);

  return (
    <div className="apple-payment">
      <div className="apple-payment-container">
        {error && <div className="error">{error}</div>}
        {paymentRequest && (
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        )}
      </div>
    </div>
  );
};
