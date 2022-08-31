import { CartProductType } from "../types/Product";

export const CartBox = ({ product }: CartProductType) => {
  return (
    <div className="box">
      <i className="fas fa-times"></i>
      <img src={`./assets/images/${product.img}`} alt="" />
      <div className="content">
        <h3>{product.name}</h3>
        <span> quantity : </span>
        <input type="number" name="" value={product.quantity} id="" />
        <br />
        <span> price : </span>
        <span className="price"> ${product.price} </span>
      </div>
    </div>
  );
};
