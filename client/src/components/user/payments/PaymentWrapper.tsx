import { useState } from "react";
import { ApplePayment } from "./ApplePayment";
import { loadStripe } from "@stripe/stripe-js";
import { PaypalPayment } from "./PaypalPayment";
import { StripePayment } from "./StripePayment";
import { getTip } from "../../../redux/tip.slice";
import { Elements } from "@stripe/react-stripe-js";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY!);

export const PaymentWrapper = ({ totalPrice }: { totalPrice: number }) => {
  const tip = useAppSelector(getTip);
  const currency = useAppSelector(getRestaurantCurrency);
  const [paymentSelected, setPaymentSelected] = useState<number>(0);
  const [isDropDownVisible, setDropDownVisible] = useState<boolean>(false);

  // Add 19% VAT
  totalPrice = +(totalPrice + totalPrice * 0.19).toFixed(2);

  return (
    <div className="order-btn-wrapper">
      <div className="row">
        <div className="payment">
          {paymentSelected === 3 && (
            <div className="payment-icon">
              <img
                src="../../../assets/images/apple-pay.svg"
                alt=""
                width={40}
              />
            </div>
          )}
          {paymentSelected === 0 && (
            <div className="payment-icon">
              <img
                src="../../../assets/images/visa-dark.svg"
                alt=""
                width={40}
              />
            </div>
          )}
          {paymentSelected === 1 && (
            <div className="payment-icon">
              <img
                src="../../../assets/images/paypal-dark.svg"
                width={40}
                alt=""
              />
            </div>
          )}
          {paymentSelected === 2 && (
            <div className="payment-icon">
              <img src="../../../assets/images/crypto-sm.png" alt="" />
            </div>
          )}
          <div className="options">
            <div>Payment</div>
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => setDropDownVisible(!isDropDownVisible)}
              >
                {paymentSelected === 0 && "Visa"}
                {paymentSelected === 1 && "PayPal"}
                {paymentSelected === 2 && "Crypto"}
                {paymentSelected === 3 && "Apple pay"}
                <i className="fa fa-caret-down"></i>
              </button>
              {isDropDownVisible && (
                <div
                  className="dropdown-content"
                  onClick={() => setDropDownVisible(!isDropDownVisible)}
                >
                  <span onClick={() => setPaymentSelected(0)}>Visa</span>
                  <span onClick={() => setPaymentSelected(1)}>PayPal</span>
                  <span onClick={() => setPaymentSelected(2)}>Crypto</span>
                  <span onClick={() => setPaymentSelected(3)}>Apple pay</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="total-price">
          Total price:{" "}
          <span>
            {getSymbol(currency)}
            {totalPrice}
          </span>
        </div>
      </div>
      {paymentSelected === 3 && (
        <Elements stripe={stripePromise}>
          <ApplePayment totalPrice={totalPrice} />
        </Elements>
      )}
      {paymentSelected === 0 && (
        <Elements stripe={stripePromise}>
          <StripePayment totalPrice={totalPrice} />
        </Elements>
      )}
      {paymentSelected === 1 && <PaypalPayment totalPrice={totalPrice} />}
      {paymentSelected === 2 && (
        <button className="bg-none">
          <div className="order-btn">Order now</div>
        </button>
      )}
    </div>
  );
};
