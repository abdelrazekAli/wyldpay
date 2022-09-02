import { CartProductType } from "../types/Product";
import { removeFromCart } from "../redux/cart.slice";
import { useAppDispatch } from "../redux/store.hooks";

export const CartBox = ({ product }: CartProductType) => {
  const dispatch = useAppDispatch();
  const RemoveFromCartHandler = (productId: number) => {
    dispatch(removeFromCart(productId));
  };
  return (
    <div className="box">
      <i
        className="fas fa-times"
        onClick={() => RemoveFromCartHandler(product.id)}
      ></i>
      <img src={`./assets/images/${product.img}`} alt="" />
      <div className="content">
        <h3>
          {product.quantity > 1
            ? `${product.quantity} * ${product.name}`
            : product.name}
        </h3>
        {/* <span> quantity : </span>
        <span className="price"> {product.quantity}</span> */}
        <br />
        <span> price : </span>
        <span className="price">
          ${(product.quantity * product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
