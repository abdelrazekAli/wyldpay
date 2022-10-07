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
        <div className="logo">
          <img src={`../../assets/images/simple-logo.svg`} alt="" />
        </div>
      </div>
    </div>
  );
};
