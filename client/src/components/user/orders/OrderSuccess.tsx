import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../../styles/menu/orderSuccess.sass";
import { getCartProducts, getTotalPrice } from "../../../redux/cart.slice";
import { useAppSelector } from "../../../redux/store.hooks";
import { downloadReceipt } from "../../../utils/orderReceipt";

export const Success = () => {
  // const tip = useLocation().state as number | null;
  let subPrice = useAppSelector(getTotalPrice).toFixed(2);
  const cartProducts = useAppSelector(getCartProducts);

  useEffect(() => {
    // Set scroll to top
    window.scrollTo(0, 0);

    // Clear localstorage cart
    localStorage.removeItem("cart");
  }, []);

  return (
    <>
      {cartProducts.length > 0 ? (
        <div className="order-success">
          <div className="success-icon">
            <img
              src="../../../../assets/images/payment-success-sm.png"
              alt=""
            />
          </div>
          <h1 className="heading-1">
            We've received your order <br /> and we'll prepare it right away
          </h1>
          <div className="google-rate">
            <div className="heading-2">Please rate us on Google</div>
            <div
              onClick={() =>
                window.open(
                  "https://www.google.com/business",
                  "Google review",
                  "width=600,height=400"
                )
              }
              className="rate-wrapper"
            >
              <div className="text">
                <img src="../../../../assets/images/star.svg" alt="" />
                Evaluate
              </div>
              <div className="icon">
                <img src="../../../../assets/images/open-right.svg" alt="" />
              </div>
            </div>
          </div>
          <div className="social-links">
            <div className="heading-2">We're on social media</div>
            <div className="links">
              <a href={"https://instagram.com"} className="link">
                <img src="../../../../assets/images/insta.svg" alt="" />
              </a>
              <a href={"https://telegram.org"} className="link">
                <img src="../../../../assets/images/telegram.svg" alt="" />
              </a>
              <a href={"https://youtube.com"} className="link">
                <img src="../../../../assets/images/youtube.svg" alt="" />
              </a>
              <a href={"https://twitter.com"} className="link">
                <img src="../../../../assets/images/twitter.svg" alt="" />
              </a>
            </div>
          </div>
          <div
            className="invoice-btn-wrapper"
            onClick={() => downloadReceipt(cartProducts, +subPrice)}
          >
            <div className="invoice-btn">Download Invoice</div>
          </div>
        </div>
      ) : (
        <div className="no-cart-items">No order items added yet</div>
      )}
    </>
  );
};
