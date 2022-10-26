import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTip } from "../../../../redux/tip.slice";
import { useAppSelector } from "../../../../redux/store.hooks";
import {
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getDiscount } from "../../../../redux/discount.slice";
import { getCartProducts } from "../../../../redux/cart.slice";
import { PaymentMethod } from "../../../../types/PaymentMethod";
import { getRestaurantCurrency } from "../../../../redux/restaurant.slice";

export const ApplePayment = ({
  orderNote,
  totalPrice,
  stripeKeys,
}: {
  orderNote: string;
  totalPrice: number;
  stripeKeys: PaymentMethod;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const tip = useAppSelector(getTip);
  const { restId, tableId } = useParams();
  const discount = useAppSelector(getDiscount);
  const currency = useAppSelector(getRestaurantCurrency);

  const [error, setError] = useState<any | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<any>();
  const [clientSecret, setClientSecret] = useState<string>("");

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

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: "DE",
      currency,
      total: {
        label: "total",
        amount: Math.trunc(+totalPrice.toFixed(2) * 100),
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
          amount: +totalPrice.toFixed(2),
          currency,
          secretKey: stripeKeys.secretKey,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.log(err);
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
        console.log(stripeError.message);
        setError(stripeError.message);
        return;
      }

      // if success
      submitOrder("Apple pay");
    });
  }, [stripe, elements]);

  return (
    <div className="apple-payment">
      <div className="apple-payment-container">
        <div className="error">{error}</div>
        {paymentRequest && (
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        )}
      </div>
    </div>
  );
};
