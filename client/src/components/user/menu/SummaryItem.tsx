import { ProductPropType } from "../../../types/Product";

export const SummaryItem = ({ product }: ProductPropType) => {
  return (
    <div className="order-item">
      <div className="order-item-img-wrapper">
        <div>
          <img
            className="order-item-img"
            src={`../../../assets/images/order-img.png`}
            alt=""
          />
        </div>
      </div>
      <div className="order-item-texts">
        <h2 className="capitalize">
          {product.quantity!}*{product.name}
        </h2>
      </div>
      <div className="counters-price-wrapper">
        <span>€{(product.quantity! * product.price).toFixed(2)}</span>
      </div>
    </div>
  );
};
