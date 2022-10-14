import { useNavigate } from "react-router-dom";
import { ItemCounters } from "./ItemCounters";
import { truncate } from "../../../utils/stringTruncate";
import { ProductPropType } from "../../../types/Product";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";

export const Item = ({ product }: ProductPropType) => {
  let navigate = useNavigate();
  const currency = useAppSelector(getRestaurantCurrency);

  return (
    <div className="menu-item">
      <div
        className="menu-item-texts"
        onClick={() =>
          navigate(`./item/${product._id}`, {
            state: product,
          })
        }
      >
        <h2 className="capitalize">{product.name}</h2>
        <p>
          {product.desc.length > 80 ? truncate(product.desc, 80) : product.desc}
        </p>
        <span>
          {getSymbol(currency)}
          {product.price.toFixed(2)}
        </span>
      </div>
      <div className="menu-item-img-wrapper">
        <div>
          <img
            className="menu-item-img"
            src={product.img}
            alt=""
            onClick={() =>
              navigate(`./item/${product._id}`, { state: product })
            }
          />
        </div>
        <ItemCounters product={product} />
      </div>
    </div>
  );
};
