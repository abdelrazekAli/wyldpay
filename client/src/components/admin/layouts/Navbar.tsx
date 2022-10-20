import { Link } from "react-router-dom";
import "../../../styles/menu/header.sass";
import { useAppDispatch } from "../../../redux/store.hooks";
import { toggleSidebar } from "../../../redux/layouts.slice";

export const Navbar = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <header className="header">
        <button
          className="toggle-button"
          onClick={() => dispatch(toggleSidebar())}
        >
          <div className="toggle-button-line" />
          <div className="toggle-button-line" />
          <div className="toggle-button-line" />
        </button>
        <Link to="/admin/home" className="logo">
          <img
            src="../../assets/images/logo-blue.png"
            alt=""
            style={{ width: "10.5rem" }}
          />
        </Link>
        {/* {user && (
          <div className="dropdown">
            <button className="dropbtn">
              {user.firstName}
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link to="/admin/profile">Profile</Link>
              <Link to="/admin/menu">Menu</Link>
              <Link to="/admin/orders">Orders</Link>
              <Link to="/admin/coupons">Coupons</Link>
              <Link to={`/menu/${user.restaurantId}/1`}>Go to live</Link>
              <Link to="/admin/tables">Tables QR</Link>
              <span onClick={logoutHandler} className="color-red">
                Logout
              </span>
            </div>
          </div>
        )} */}
      </header>
    </>
  );
};
