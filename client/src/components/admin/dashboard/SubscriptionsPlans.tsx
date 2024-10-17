import "../../../styles/plans.sass";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { fetchData } from "../../../utils/fetchData";
import { PricingCard } from "../layouts/PricingCard";
import { StripePrice } from "../../../types/StripePrice";

export const SubscriptionsPlans = () => {
  const [prices, setPrices] = useState<StripePrice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Fetch subscription prices
    fetchData<[]>(
      `${process.env.REACT_APP_API_VERSION!}/subscriptions/prices`,
      "",
      setPrices,
      setError,
      setIsLoading
    );
  }, []);

  return (
    <div>
      <section className="pricing-section">
        <div className="container">
          <h3>Finally setup your plan!</h3>
          <p className="mb-6">
            Click buy plan button, <br /> it will redirect you to the payment
            page.
          </p>
          <div className="row">
            {!isLoading ? (
              prices.map((price, i) => <PricingCard price={price} key={i} />)
            ) : (
              <div className="p-5 text-center mt-5">
                <CircularProgress color="inherit" size="25px" />
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="d-flex justify-content-center">
        <span className="color-error text-center fs-2 my-1">{error}</span>
      </div>
    </div>
  );
};
