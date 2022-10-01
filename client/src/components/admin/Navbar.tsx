import "../../styles/menu/header.sass";
import { Link } from "react-router-dom";
import { getUser, logout } from "../../redux/user.slice";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  // Logout handler
  const logoutHandler = () => {
    dispatch(logout());
    window.location.replace("/admin/login");
  };

  return (
    <>
      <header className="header">
        <Link to="/admin/dashboard" className="logo">
          {/* <i className="fas fa-utensils"></i>WyldPay */}
          <img
            src="../../assets/images/logo-blue.png"
            alt=""
            style={{ width: "13rem" }}
          />
        </Link>
        {user && (
          <div className="dropdown">
            {/* <img
            src="http://hello-chat-abdelrazek.herokuapp.com/imgs/avatar.png"
            alt=""
          /> */}
            <button className="dropbtn">
              {user.firstName}
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to="/admin/profile">Profile</Link>
              <Link to="/admin/menu">Menu</Link>
              <Link to="/admin/orders">Orders</Link>
              <Link to="/admin/coupons">Coupons</Link>
              <Link to="/admin/tables">Tables QR</Link>
              <span onClick={logoutHandler} className="color-red">
                Logout
              </span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
