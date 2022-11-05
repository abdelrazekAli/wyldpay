import axios from "axios";
import "../../../styles/plans.sass";
import { useEffect, useState } from "react";

export const SubscriptionsPlans = () => {
  const userId = localStorage.getItem("userId");
  const [prices, setPrices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const { data: response } = await axios.get(
          "/api/v1/subscriptions/prices"
        );
        setPrices(response.data);
      } catch (err) {
        setError("Failed to load plans");
        console.log(err);
      }
    };
    fetchPrices();
  }, []);

  const createSession = async (priceId: string) => {
    setisLoading(true);

    // This step will be deleted next
    await axios.post("/api/v1/banks", {
      name: "bank name",
      iban: "bank iban",
      bic: "bank bic",
      userId,
      customerFees: false,
    });

    const { data: response } = await axios.post(
      "/api/v1/subscriptions/session",
      {
        userId,
        priceId,
      }
    );

    window.location.href = response.url;
  };

  return (
    <div>
      <section className="pricing-section">
        <div className="container">
          <h3>Finally setup your plan!</h3>
          <p className="mb-6">
            Click buy plan button, <br /> it will redirect you to the payment
            page.
          </p>
          {prices.map((price: any, i) => (
            <div className="pricing-block" key={i}>
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
                  {/* <li className="false">Free Contacts</li>  */}
                </ul>
                <div className="btn-box">
                  <button
                    className="theme-btn"
                    disabled={isLoading}
                    onClick={() => createSession(price.id)}
                  >
                    {isLoading ? "...Loading" : "Buy plan"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="d-flex justify-content-center">
        <span className="color-error text-center fs-2 my-1">{error}</span>
      </div>
    </div>
  );
};
