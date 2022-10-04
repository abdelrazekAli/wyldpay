import "../../../styles/menu/checkout.sass";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store.hooks";
import { getCartProducts } from "../../../redux/cart.slice";
import { OrderItem } from "./OrderItem";

export const Orders = () => {
  const navigate = useNavigate();
  const cartProducts = useAppSelector(getCartProducts);

  return (
    <div className="checkout">
      <div className="back-icon" onClick={() => navigate(-1)}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <h1 className="heading-1">Your order</h1>
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map((product, i) => (
            <OrderItem product={product} key={i} />
          ))}
          <Link to={"../menu/restId/tableNum/order"}>
            <div className="order-btn-wrapper">
              <div className="order-btn">Checkout</div>
            </div>
          </Link>
        </>
      ) : (
        <div className="no-items">No order items added yet</div>
      )}
    </div>
  );
};
