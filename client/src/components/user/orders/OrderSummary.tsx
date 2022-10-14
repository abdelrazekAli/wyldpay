import { useState } from "react";
import "../../../styles/menu/orderSummary.sass";
import { OrderDiscount } from "./OrderDiscount";
import { SummaryItem } from "../menu/SummaryItem";
import { DiscountProps } from "../../../types/Coupon";
import { getSymbol } from "../../../utils/currencySymbol";
import { PaymentWrapper } from "../payments/PaymentWrapper";
import { useAppSelector } from "../../../redux/store.hooks";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";
import { getCartProducts, getTotalPrice } from "../../../redux/cart.slice";

export const OrderSummary = () => {
  const navigate = useNavigate();
  const { tableId, restId } = useParams();
  const orderNote = useLocation().state as string;

  let subPrice = useAppSelector(getTotalPrice);
  const cartProducts = useAppSelector(getCartProducts);
  const currency = useAppSelector(getRestaurantCurrency);

  const [tip, setTip] = useState<number | null>(null);
  const [discount, setDiscount] = useState<DiscountProps | null>(null);

  const totalPrice = () => {
    // Check tips
    tip && tip !== 0 && (subPrice += subPrice * (tip / 100));

    // Check discount
    discount &&
      (discount.type === "percentage"
        ? (subPrice -= subPrice * (discount.value / 100))
        : discount.value < subPrice
        ? (subPrice -= discount.value)
        : (subPrice = 0));
    return +subPrice.toFixed(2);
  };

  return (
    <div className="order-summary">
      <div
        className="back-icon"
        onClick={() =>
          navigate(`/menu/${restId}/${tableId}/checkout`, {
            state: orderNote,
          })
        }
      >
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
              <span>
                {getSymbol(currency)}
                {subPrice.toFixed(2)}
              </span>
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
                  {getSymbol(currency)}
                  {(subPrice * 0.05).toFixed(2)}
                </div>
                <div className="tip-percentage">5%</div>
              </div>
              <div
                className={tip === 10 ? "tip selected-tip" : "tip"}
                onClick={() => setTip(10)}
              >
                <div className="tip-price">
                  {getSymbol(currency)}
                  {(subPrice * 0.1).toFixed(2)}
                </div>
                <div className="tip-percentage">10%</div>
              </div>
              <div
                className={tip === 20 ? "tip selected-tip" : "tip"}
                onClick={() => setTip(20)}
              >
                <div className="tip-price">
                  {getSymbol(currency)}
                  {(subPrice * 0.2).toFixed(2)}
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
          <OrderDiscount
            onSuccess={(data) => setDiscount(data)}
            currency={getSymbol(currency)}
          />
          <PaymentWrapper totalPrice={totalPrice()} tip={tip} />
        </>
      ) : (
        <div className="no-items">No order items added yet</div>
      )}
    </div>
  );
};
