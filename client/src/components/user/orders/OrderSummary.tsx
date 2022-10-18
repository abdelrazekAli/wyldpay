import "../../../styles/menu/orderSummary.sass";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";

export const OrderSummary = ({
  subPrice,
  vatAmount,
}: {
  subPrice: number;
  vatAmount: number;
}) => {
  const currency = useAppSelector(getRestaurantCurrency);

  return (
    <div className="order-summary">
      <div className="order-item-icon-wrapper">
        <img src="../../../assets/images/summary.svg" alt="" />
      </div>
      <div className="order-item-texts">
        <h2 className="capitalize">
          Summary{" "}
          <span>
            ({vatAmount.toFixed(2)}
            {getSymbol(currency)} VAT Included)
          </span>
        </h2>
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
