import { useState } from "react";
import { OrderItem } from "./OrderItem";
import "../../../styles/menu/checkout.sass";
import { useAppSelector } from "../../../redux/store.hooks";
import { getCartProducts } from "../../../redux/cart.slice";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export const Orders = () => {
  const navigate = useNavigate();
  const { tableId, restId } = useParams();
  const noteStateValue = useLocation().state as string;

  const cartProducts = useAppSelector(getCartProducts);
  const [noteValue, setNoteValue] = useState(noteStateValue);

  return (
    <div className="checkout">
      <div
        className="back-icon"
        onClick={() => navigate(`/menu/${restId}/${tableId}`)}
      >
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
              value={noteValue}
              onChange={(e) => setNoteValue(e.target.value)}
              id=""
              rows={2}
              placeholder="Leave a notes about your order..."
            ></textarea>
          </div>
          <Link to={`/menu/${restId}/${tableId}/order`} state={noteValue}>
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
