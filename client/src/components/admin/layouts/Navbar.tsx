import { Link } from "react-router-dom";
import "../../../styles/menu/header.sass";
import { getUser } from "../../../redux/user.slice";
import { toggleSidebar } from "../../../redux/layouts.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  return (
    <>
      <header className="header">
        {user ? (
          <>
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
          </>
        ) : (
          <Link to="/admin/home" className="logo pl-10">
            <img
              src="../../assets/images/logo-blue.png"
              alt=""
              style={{ width: "10.5rem" }}
            />
          </Link>
        )}
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
