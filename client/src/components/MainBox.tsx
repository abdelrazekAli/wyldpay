import { Counters } from "./Counters";
import { ProductPropType } from "../types/Product";

export const MainBox = ({ product }: ProductPropType) => {
  return (
    <div className="box">
      <div className="image">
        <img src={`./assets/images/${product.img}`} alt="" />
      </div>
      <div className="content">
        <h3>{product.name}</h3>
        <div className="price-container">
          <div className="price">${product.price.toFixed(2)}</div>
          <Counters product={product} />
        </div>
      </div>
    </div>
  );
};
