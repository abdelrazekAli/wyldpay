import { ProductPropType } from "../../../types/Product";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";

export const SummaryItem = ({ product }: ProductPropType) => {
  const currency = useAppSelector(getRestaurantCurrency);

  return (
    <div className="order-item">
      <div className="order-item-img-wrapper">
        <div>
          <img className="order-item-img" src={product.img} alt="" />
        </div>
      </div>
      <div className="order-item-texts">
        <h2 className="capitalize">
          {product.quantity!} <span className="lowercase">x</span>{" "}
          {product.name}
        </h2>
      </div>
      <div className="counters-price-wrapper">
        <span>
          {getSymbol(currency)}
          {(product.quantity! * product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
