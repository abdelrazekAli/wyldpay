import { useNavigate } from "react-router-dom";
import { MainItemCounters } from "./MainItemCounters";
import { ProductPropType } from "../../../types/Product";
import { truncate } from "../../../utils/stringTruncate";

export const MainItem = ({ product }: ProductPropType) => {
  let navigate = useNavigate();
  return (
    <div className="menu-item">
      <div
        className="menu-item-texts"
        onClick={() => navigate(`./item/${product._id}`, { state: product })}
      >
        <h2 className="capitalize">{product.name}</h2>
        <p>{truncate(product.desc, 100)}</p>
        <span>€{product.price.toFixed(2)}</span>
      </div>
      <div className="menu-item-img-wrapper">
        <div>
          <img
            className="menu-item-img"
            src={`../../assets/images/simple-item-img.png`}
            alt=""
            onClick={() =>
              navigate(`./item/${product._id}`, { state: product })
            }
          />
        </div>
        <MainItemCounters product={product} />
      </div>
    </div>
  );
};
