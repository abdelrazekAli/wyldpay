import "../../styles/header.sass";
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
        <a href="/" className="logo">
          <i className="fas fa-utensils"></i>WyldPay
        </a>
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
              <Link to="/admin/menu">Menu</Link>
              <Link to="/admin/orders">Orders</Link>
              {/* <Link to="/">App</Link> */}
              <Link to="/admin/profile">Profile</Link>
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
