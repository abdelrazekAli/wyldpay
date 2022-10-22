import axios from "axios";
import "../../../../styles/payments.sass";
import { Modal } from "../../layouts/Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTip } from "../../../../redux/tip.slice";
import { getCartProducts } from "../../../../redux/cart.slice";
import { useAppSelector } from "../../../../redux/store.hooks";
import { getDiscount } from "../../../../redux/discount.slice";
import { PaymentMethod } from "../../../../types/PaymentMethod";
import { getRestaurantCurrency } from "../../../../redux/restaurant.slice";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export const StripePayment = ({
  totalPrice,
  orderNote,
  stripeKeys,
}: {
  totalPrice: number;
  orderNote: string;
  stripeKeys: PaymentMethod;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const tip = useAppSelector(getTip);
  const { restId, tableId } = useParams();
  const discount = useAppSelector(getDiscount);

  const currency = useAppSelector(getRestaurantCurrency);
  const [error, setError] = useState<string | null>(null);
  const [cardValid, setCardValid] = useState<boolean>(false);
  const [paymentFailed, setPaymentFailed] = useState<boolean>(false);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const cartProducts = useAppSelector(getCartProducts);
  const cartItems = cartProducts.map((product) => {
    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
  });

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

  const confirmPayment = async () => {
    if (!cardValid) {
      return setError("Please enter a valid card information");
    }
    setError(null);
    setPaymentFailed(false);
    setPaymentLoading(true);
    axios
      .post("/api/v1/payments/stripe/create-payment-intent", {
        amount: +totalPrice.toFixed(2),
        currency,
        secretKey: stripeKeys.secretKey,
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
          submitOrder("Visa");
          setPaymentLoading(false);
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
        <div className="stripe-payment-container overflow-hidden">
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
      </div>
      <button onClick={confirmPayment} className="order-btn">
        Order now
      </button>
    </div>
  );
};
