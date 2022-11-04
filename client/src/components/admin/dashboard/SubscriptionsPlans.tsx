import axios from "axios";
import "../../../styles/plans.sass";
import { useEffect, useState } from "react";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SubscriptionsPlans = () => {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const { data: response } = await axios.get(
        "/api/v1/subscriptions/prices"
      );
      setPrices(response.data);
    };
    fetchPrices();
  }, []);

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      "/api/v1/subscriptions/session",
      {
        priceId,
      }
    );

    window.location.href = response.url;
  };

  return (
    <div>
      <section className="pricing-section">
        <div className="outer-box">
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
                  <button className="theme-btn">Buy plan</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
