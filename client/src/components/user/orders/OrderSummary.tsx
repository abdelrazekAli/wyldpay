import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";

export const OrderSummary = ({ subPrice }: { subPrice: number }) => {
  const currency = useAppSelector(getRestaurantCurrency);

  return (
    <div className="order-summary">
      <div className="order-item-icon-wrapper">
        <img src="../../../assets/images/summary.svg" alt="" />
      </div>
      <div className="order-item-texts">
        <h2 className="capitalize">Summary (VAT Included)</h2>
      </div>
      <div className="counters-price-wrapper">
        <span>
          {getSymbol(currency)}
          {subPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
