import { useState } from "react";
import { OrderItem } from "./OrderItem";
import "../../../styles/menu/checkout.sass";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/store.hooks";
import { getCartProducts } from "../../../redux/cart.slice";

export const Orders = () => {
  const navigate = useNavigate();
  const [notesValue, setNotesValue] = useState("");
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
          <div className="notes">
            <div className="icon-text">
              <i className="far fa-comment"></i>
              Order notes
            </div>
            <textarea
              value={notesValue}
              onChange={(e) => setNotesValue(e.target.value)}
              id=""
              rows={2}
              placeholder="Leave a notes about your order..."
            ></textarea>
          </div>
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
