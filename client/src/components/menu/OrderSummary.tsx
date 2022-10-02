import { useRef, useState } from "react";
import { SummaryItem } from "./SummaryItem";
import "../../styles/menu/orderSummary.sass";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store.hooks";
import { getCartProducts, getTotalPrice } from "../../redux/cart.slice";

export const OrderSummary = () => {
  const navigate = useNavigate();
  let subPrice = useAppSelector(getTotalPrice);
  const [tip, setTip] = useState<number | null>(null);
  const discountName = useRef<HTMLInputElement>(null!);
  const cartProducts = useAppSelector(getCartProducts);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const handleDiscount = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormVisible(!isFormVisible);
  };

  const totalPrice = () => {
    // Check tips
    tip && tip !== 0 && (subPrice += subPrice * (tip / 100));
    return subPrice.toFixed(2);
  };

  return (
    <>
      <div className="order-summary">
        {isFormVisible && (
          <div id="myModal" className="modal form-modal">
            <div className="modal-content p-relative custom-content">
              <span
                onClick={() => setFormVisible(!isFormVisible)}
                className="modal-close"
              >
                &times;
              </span>
              <div className="main-content">
                <h2>Enter discount code</h2>
                <form onSubmit={handleDiscount}>
                  <input type="text" ref={discountName} className="mb-1" />
                  <button
                    disabled={!discountName}
                    type="submit"
                    className="btn"
                  >
                    Enter
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="back-icon" onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <h1 className="heading-1">Your order</h1>
        {cartProducts.length > 0 ? (
          <>
            {cartProducts.map((product, i) => (
              <SummaryItem product={product} key={i} />
            ))}
            <div className="order-summary">
              <div className="order-item-icon-wrapper">
                <img src="../../../assets/images/summary.svg" alt="" />
              </div>
              <div className="order-item-texts">
                <h2 className="capitalize">Summary</h2>
              </div>
              <div className="counters-price-wrapper">
                <span>€{subPrice.toFixed(2)}</span>
              </div>
            </div>
            <h2 className="heading-2">Choose a tip</h2>
            <p className="heading-p">Our staff will be grateful</p>
            <div className="tips">
              <div className="row">
                <div
                  className={tip === 5 ? "tip selected-tip" : "tip"}
                  onClick={() => setTip(5)}
                >
                  <div className="tip-price">
                    €{(subPrice * 0.05).toFixed(2)}
                  </div>
                  <div className="tip-percentage">5%</div>
                </div>
                <div
                  className={tip === 10 ? "tip selected-tip" : "tip"}
                  onClick={() => setTip(10)}
                >
                  <div className="tip-price">
                    €{(subPrice * 0.1).toFixed(2)}
                  </div>
                  <div className="tip-percentage">10%</div>
                </div>
                <div
                  className={tip === 20 ? "tip selected-tip" : "tip"}
                  onClick={() => setTip(20)}
                >
                  <div className="tip-price">
                    €{(subPrice * 0.2).toFixed(2)}
                  </div>
                  <div className="tip-percentage">20%</div>
                </div>
              </div>
              <div
                className={tip === 0 ? "no-tip selected-no-tip" : "no-tip"}
                onClick={() => setTip(0)}
              >
                No tip
              </div>
            </div>
            <div
              className="discount-wrapper"
              onClick={() => setFormVisible(!isFormVisible)}
            >
              <div className="text">
                <img src="../../../assets/images/discount.svg" alt="" />
                Add discount code
              </div>
              <div className="icon">
                <img src="../../../assets/images/discount-open.svg" alt="" />
              </div>
            </div>
            <div className="order-btn-wrapper">
              <div className="row">
                <div className="payment">
                  <div className="payment-icon">
                    <img src="../../../assets/images/apple-pay.svg" alt="" />
                  </div>
                  <div className="options">
                    <div>Payment</div>
                    <div className="dropdown">
                      <button className="dropbtn">
                        Apple pay<i className="fa fa-caret-down"></i>
                      </button>
                      <div className="dropdown-content">
                        <span>Apple pay</span>
                        <span>Visa</span>
                        <span>PayPal</span>
                        <span>Crypto</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="total-price">
                  Total price: <span>€{totalPrice()}</span>
                </div>
              </div>
              <div className="order-btn">Order now</div>
            </div>
          </>
        ) : (
          <div className="no-items">No order items added yet</div>
        )}
      </div>
    </>
  );
};
