import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ApplePayment } from "../methods/ApplePayment";
import { StripePayment } from "../methods/StripePayment";
import { getSymbol } from "../../../../utils/currencySymbol";
import { useAppSelector } from "../../../../redux/store.hooks";
import { getRestaurantState } from "../../../../redux/restaurant.slice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_CLIENT_KEY!);

export const StripeContainer = ({ totalPrice }: { totalPrice: number }) => {
  const restaurant = useAppSelector(getRestaurantState);
  const [paymentSelected, setPaymentSelected] = useState<number>(0);
  const [isDropDownVisible, setDropDownVisible] = useState<boolean>(false);

  return (
    <>
      <div className="row">
        <div className="payment">
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
                src="../../../assets/images/apple-pay.svg"
                alt=""
                width={40}
              />
            </div>
          )}
          <div className="options">
            <div>Payment</div>
            <div className="dropdown ">
              <button
                className="dropbtn"
                onClick={() => setDropDownVisible(!isDropDownVisible)}
              >
                {paymentSelected === 0 && "Visa"}
                {paymentSelected === 1 && "Apple pay"}
                <i className="fa fa-caret-down"></i>
              </button>
              {isDropDownVisible && (
                <div
                  className="dropdown-content top--8"
                  onClick={() => setDropDownVisible(!isDropDownVisible)}
                >
                  <span onClick={() => setPaymentSelected(0)}>Visa</span>

                  <span onClick={() => setPaymentSelected(1)}>Apple pay</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="total-price">
          Total price:{" "}
          <span>
            {getSymbol(restaurant.data?.currency!)}
            {totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      {paymentSelected === 0 && (
        <Elements stripe={stripePromise}>
          <StripePayment totalPrice={totalPrice} />
        </Elements>
      )}
      {paymentSelected === 1 && (
        <Elements stripe={stripePromise}>
          <ApplePayment totalPrice={totalPrice} />
        </Elements>
      )}
    </>
  );
};
