import { ProductType } from "../types/Product";

export const MainBox = ({ product }: ProductType) => {
  return (
    <div className="box">
      <div className="image">
        <img src={`./assets/images/${product.img}`} alt="" />
      </div>
      <div className="content">
        <h3>{product.name}</h3>

        <div className="price">${product.price.toFixed(2)} </div>
        <a href="/" className="btn">
          add to cart
        </a>
      </div>
    </div>
  );
};
