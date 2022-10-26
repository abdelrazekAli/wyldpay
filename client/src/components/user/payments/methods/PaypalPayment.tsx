import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getTip } from "../../../../redux/tip.slice";
import { useAppSelector } from "../../../../redux/store.hooks";
import { getCartProducts } from "../../../../redux/cart.slice";
import { getDiscount } from "../../../../redux/discount.slice";
import { PaymentMethod } from "../../../../types/PaymentMethod";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getRestaurantCurrency } from "../../../../redux/restaurant.slice";

export const PaypalPayment = ({
  totalPrice,
  orderNote,
  paypalKeys,
}: {
  orderNote: string;
  totalPrice: number;
  paypalKeys: PaymentMethod;
}) => {
  const tip = useAppSelector(getTip);
  const { restId, tableId } = useParams();
  const discount = useAppSelector(getDiscount);
  const currency = useAppSelector(getRestaurantCurrency);
  const [error, setError] = useState<string | null>(null);

  const cartProducts = useAppSelector(getCartProducts);
  const cartItems = cartProducts.map((product) => {
    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
  });

  const submitOrder = async (paymentMethod: string) => {
    try {
      const res = await axios.post("/api/v1/orders", {
        items: cartItems,
        totalPrice,
        notes: orderNote || "",
        paymentMethod,
        tableNum: tableId,
        tip: tip || null,
        discount: discount || null,
        restId,
      });
      window.location.replace(`/orders/${restId}/${res.data._id}`);
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  return (
    <div className="paypal-payment">
      <div className="paypal-payment-container">
        <div className="error">{error}</div>
        <PayPalScriptProvider
          options={{
            "client-id": paypalKeys.publicKey,
            "disable-funding": "card",
            currency,
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
              return submitOrder("PayPal");
            }}
            onError={(err) => {
              console.log(err);
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
