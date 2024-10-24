import { useNavigate } from "react-router-dom";
import { getTotalQuantity } from "../../../redux/cart.slice";
import { useAppSelector } from "../../../redux/store.hooks";

export const ViewOrderBtn = () => {
  const navigate = useNavigate(),
    cartTotalQuantity = useAppSelector(getTotalQuantity);
  return (
    <>
      {cartTotalQuantity > 0 && (
        <div
          className="view-order-btn-wrapper"
          onClick={() => navigate(`./checkout`)}
        >
          <div className="view-order-btn">
            View order
            <div className="quantity">{cartTotalQuantity}</div>
          </div>
        </div>
      )}
    </>
  );
};
