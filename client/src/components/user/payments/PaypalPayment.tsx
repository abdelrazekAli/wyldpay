import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const PaypalPayment = ({
  totalPrice,
  tip,
}: {
  totalPrice: number;
  tip: number | null;
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="paypal-payment">
      <div className="paypal-payment-container">
        {error && <div className="error">{error}</div>}
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_PAYPAL_KEY!,
            "disable-funding": "card",
            currency: "EUR",
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: String(totalPrice),
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              navigate("success", { state: tip });
            }}
            onError={() => {
              setError("Something went wrong!");
            }}
            onCancel={() => {
              setError("Payment canceled!");
            }}
            style={{
              color: "blue",
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};
