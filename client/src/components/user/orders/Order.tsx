import { OrderTip } from "./OrderTip";
import { OrderSummary } from "./OrderSummary";
import { OrderDiscount } from "./OrderDiscount";
import { getTip } from "../../../redux/tip.slice";
import { SummaryItem } from "../items/SummaryItem";
import { useAppSelector } from "../../../redux/store.hooks";
import { getDiscount } from "../../../redux/discount.slice";
import { PaymentsWrapper } from "../payments/PaymentsWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { getRestaurantState } from "../../../redux/restaurant.slice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCartProducts, getTotalPrice } from "../../../redux/cart.slice";

export const Order = () => {
  const navigate = useNavigate();
  const { tableId, restId } = useParams();
  const orderNote = useLocation().state as string;
  const restaurant = useAppSelector(getRestaurantState);

  const tip = useAppSelector(getTip);
  const discount = useAppSelector(getDiscount);
  let subPrice = useAppSelector(getTotalPrice);
  const cartProducts = useAppSelector(getCartProducts);

  // Add VAT percentage
  const vatAmount = subPrice * (restaurant.data?.vatPercentage! / 100);

  subPrice = +(subPrice + vatAmount).toFixed(2);

  const tipAmount = subPrice * (tip! / 100);

  // Calc total price
  const totalPrice = () => {
    // Check tips
    tip && tip !== 0 && (subPrice += tipAmount);

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
        <FontAwesomeIcon icon={faChevronLeft} className="left-arrow" />
      </div>
      <h1 className="heading-1">Your order</h1>
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map((product, i) => (
            <SummaryItem product={product} key={i} />
          ))}
          <OrderSummary subPrice={subPrice} vatAmount={vatAmount} />
          <OrderTip subPrice={subPrice} />
          <OrderDiscount />
          <PaymentsWrapper totalPrice={totalPrice()} orderNote={orderNote} />
        </>
      ) : (
        <div className="no-items">No order items added yet</div>
      )}
    </div>
  );
};
