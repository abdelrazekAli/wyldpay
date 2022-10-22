import axios from "axios";
import { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { PaymentMethod } from "../../../types/PaymentMethod";
import { ParentContainer } from "./containers/ParentContainer";
import { StripeContainer } from "./containers/StripeContainer";
import { PaypalContainer } from "./containers/PaypalContainer";
import { getRestaurantState } from "../../../redux/restaurant.slice";

export const PaymentsWrapper = ({
  totalPrice,
  orderNote,
}: {
  totalPrice: number;
  orderNote: string;
}) => {
  const restaurant = useAppSelector(getRestaurantState);
  const [paypalKeys, setPaypalKeys] = useState<PaymentMethod>();
  const [stripeKeys, setStripeKeys] = useState<PaymentMethod>();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch payment methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await axios.get(
          `/api/v1/banks/${restaurant.data?.userId._id}`
        );

        setStripeKeys(
          res.data.paymentsMethods.filter(
            (method: PaymentMethod) => method.name === "stripe"
          )[0]
        );

        setPaypalKeys(
          res.data.paymentsMethods.filter(
            (method: PaymentMethod) => method.name === "paypal"
          )[0]
        );

        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError("Something went wrong!");
      }
    };
    fetchMethods();
  }, [restaurant.data]);

  return (
    <>
      <div className="order-btn-wrapper">
        {error && (
          <span className="error d-block my-2 text-center fs-2 color-red">
            {error}
          </span>
        )}
        {!isLoading ? (
          <>
            {stripeKeys?.publicKey &&
            stripeKeys.secretKey &&
            paypalKeys?.publicKey ? (
              <ParentContainer
                totalPrice={totalPrice}
                orderNote={orderNote}
                stripeKeys={stripeKeys}
                paypalKeys={paypalKeys}
              />
            ) : (
              <>
                {stripeKeys?.publicKey && stripeKeys.secretKey ? (
                  <StripeContainer
                    totalPrice={totalPrice}
                    orderNote={orderNote}
                    stripeKeys={stripeKeys}
                  />
                ) : (
                  <>
                    {paypalKeys?.publicKey ? (
                      <PaypalContainer
                        totalPrice={totalPrice}
                        orderNote={orderNote}
                        paypalKeys={paypalKeys}
                      />
                    ) : (
                      <>
                        <div className="row">
                          <div className="payment">
                            <div className="options"></div>
                          </div>
                          <div className="total-price">
                            Total price:{" "}
                            <span>
                              {getSymbol(restaurant.data?.currency!)}
                              {totalPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="color-gray text-center fs-2 my-2 mb-4">
                          Please update payments credientials from dashboard
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <div className="p-5 text-center">
            <CircularProgress color="inherit" size="25px" />
          </div>
        )}
      </div>
    </>
  );
};
