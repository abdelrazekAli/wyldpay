import axios from "axios";
import { useState } from "react";
import { StripePrice } from "../../../types/StripePrice";

export const PricingCard = ({ price }: { price: StripePrice }) => {
  const userId = localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Create payment
  const createSession = async (priceId: string) => {
    setIsLoading(true);

    // Create Stripe payment session
    const { data: response } = await axios.post(
      `${process.env.REACT_APP_API_VERSION!}/subscriptions/session`,
      {
        userId,
        priceId,
      }
    );

    setIsLoading(false);
    window.location.href = response.url;
  };
  return (
    <div className="pricing-block" key={price.id}>
      <div className="inner-box">
        <div className="icon-box">
          <div className="icon-outer">
            <i className="fas fa-gem"></i>
          </div>
        </div>
        <div className="price-box">
          <div className="title">QR Menu Order</div>
          <h4 className="price">€{price.unit_amount / 100}</h4>
        </div>
        <ul className="features">
          <li className="true">Menu</li>
          <li className="true">QR code</li>
          <li className="true">Ordering</li>
          <li className="true">Payment</li>
          <li className="true">Discounts and tips</li>
        </ul>
        <div className="btn-box">
          <button
            className="theme-btn"
            disabled={isLoading}
            onClick={() => createSession(price.id)}
          >
            Buy plan
          </button>
        </div>
      </div>
    </div>
  );
};
