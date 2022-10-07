import "../../../styles/menu/header.sass";
import { useNavigate } from "react-router-dom";
import { getTotalQuantiy } from "../../../redux/cart.slice";
import { useAppSelector } from "../../../redux/store.hooks";

export const MainHeader = () => {
  const navigate = useNavigate(),
    cartTotalQuantity = useAppSelector(getTotalQuantiy);

  return (
    <div className="header-wrapper">
      <div
        className="menu-header"
        style={{
          backgroundImage: `url(../../assets/images/simple-background.png)`,
        }}
      >
        {/* <div className="cart-icon" onClick={() => navigate(`./checkout`)}>
          <div className="content">
            <img src="../../assets/images/cart-bag.svg" alt="" />
            {cartTotalQuantity > 0 && (
              <div className="counter">{cartTotalQuantity}</div>
            )}
          </div>
        </div> */}
        <div className="logo">
          <img src={`../../assets/images/simple-logo.svg`} alt="" />
        </div>
      </div>
      {cartTotalQuantity > 0 && (
        <div
          className="order-btn-wrapper"
          onClick={() => navigate(`./checkout`)}
        >
          <div className="order-btn">
            View order
            <div className="quantity">{cartTotalQuantity}</div>
          </div>
        </div>
      )}
    </div>
  );
};
