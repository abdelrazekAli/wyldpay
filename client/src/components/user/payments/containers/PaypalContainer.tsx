import { useState } from "react";
import { PaypalPayment } from "../methods/PaypalPayment";
import { getSymbol } from "../../../../utils/currencySymbol";
import { useAppSelector } from "../../../../redux/store.hooks";
import { PaymentMethod } from "../../../../types/PaymentMethod";
import { getRestaurantState } from "../../../../redux/restaurant.slice";

export const PaypalContainer = ({
  orderNote,
  totalPrice,
  paypalKeys,
}: {
  orderNote: string;
  totalPrice: number;
  paypalKeys: PaymentMethod;
}) => {
  const restaurant = useAppSelector(getRestaurantState);
  const [isDropDownVisible, setDropDownVisible] = useState<boolean>(false);

  return (
    <>
      <div className="row">
        <div className="payment">
          <div className="payment-icon">
            <img
              src="../../../assets/images/paypal-dark.svg"
              width={40}
              alt=""
            />
          </div>
          <div className="options">
            <div>Payment</div>
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => setDropDownVisible(!isDropDownVisible)}
              >
                PayPal
              </button>
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
      <PaypalPayment
        totalPrice={totalPrice}
        orderNote={orderNote}
        paypalKeys={paypalKeys}
      />
    </>
  );
};
