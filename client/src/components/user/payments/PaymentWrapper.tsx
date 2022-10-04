import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { StripePayment } from "./StripePayment";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

export const PaymentWrapper = ({ totalPrice }: { totalPrice: number }) => {
  const [paymentSelected, setPaymentSelected] = useState<number>(0);
  const [isDropDownVisible, setDropDownVisible] = useState<boolean>(false);

  return (
    <div className="order-btn-wrapper">
      <div className="row">
        <div className="payment">
          {paymentSelected === 0 && (
            <div className="payment-icon">
              <img
                src="../../../assets/images/apple-pay.svg"
                alt=""
                width={40}
              />
            </div>
          )}
          {paymentSelected === 1 && (
            <div className="payment-icon">
              <img
                src="../../../assets/images/visa-dark.svg"
                alt=""
                width={40}
              />
            </div>
          )}
          {paymentSelected === 2 && (
            <div className="payment-icon">
              <img
                src="../../../assets/images/paypal-dark.svg"
                width={40}
                alt=""
              />
            </div>
          )}
          {paymentSelected === 3 && (
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
                {paymentSelected === 0 && "Apple pay"}
                {paymentSelected === 1 && "Visa"}
                {paymentSelected === 2 && "PayPal"}
                {paymentSelected === 3 && "Crypto"}
                <i className="fa fa-caret-down"></i>
              </button>
              {isDropDownVisible && (
                <div
                  className="dropdown-content"
                  onClick={() => setDropDownVisible(!isDropDownVisible)}
                >
                  <span onClick={() => setPaymentSelected(0)}>Apple pay</span>
                  <span onClick={() => setPaymentSelected(1)}>Visa</span>
                  <span onClick={() => setPaymentSelected(2)}>PayPal</span>
                  <span onClick={() => setPaymentSelected(3)}>Crypto</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="total-price">
          Total price: <span>€{totalPrice}</span>
        </div>
      </div>
      {paymentSelected === 1 && (
        <Elements stripe={stripePromise}>
          <StripePayment totalPrice={totalPrice} />
        </Elements>
      )}
      {paymentSelected !== 1 && (
        <button>
          <div className="order-btn">Order now</div>
        </button>
      )}
    </div>
  );
};
