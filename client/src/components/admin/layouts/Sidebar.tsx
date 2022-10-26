import "../../../styles/sidebar.sass";
import { NavLink } from "react-router-dom";
import { getLayouts } from "../../../redux/layouts.slice";
import { getUser, logout } from "../../../redux/user.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";

// Import icons
import {
  faCog,
  faHome,
  faShoppingCart,
  faUtensils,
  faPercentage,
  faRocket,
  faQrcode,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const hideSidebar = useAppSelector(getLayouts).sidebar;

  const viewportwidth = document.documentElement.clientWidth;
  const viewportheight = document.documentElement.clientHeight;

  // Logout handler
  const logoutHandler = () => {
    dispatch(logout());
    window.location.replace("/admin/login");
  };

  return (
    <>
      {hideSidebar ? (
        <div className="sidebar d-block">
          <div className="sidebarWrapper">
            <ul className="sidebarList">
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                  <span className="sidebar-text">Home</span>
                </li>
              </NavLink>

              <NavLink
                to="/admin/menu"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon icon={faUtensils} className="sidebar-icon" />
                  <span className="sidebar-text">Menu</span>
                </li>
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="sidebar-icon"
                  />
                  <span className="sidebar-text">Orders</span>
                </li>
              </NavLink>
              <NavLink
                to="/admin/coupons"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon
                    icon={faPercentage}
                    className="sidebar-icon"
                  />
                  <span className="sidebar-text">Coupons</span>
                </li>
              </NavLink>
              <li
                className="sidebar-item"
                onClick={() =>
                  window.open(
                    `/menu/${user.restaurantId}/1`,
                    "Restaurant live",
                    `width=460,height=${viewportheight},left=${+viewportwidth}`
                  )
                }
              >
                <i className="fas fa-rocket-launch"></i>
                <FontAwesomeIcon icon={faRocket} className="sidebar-icon" />
                <span className="sidebar-text">Go to live</span>
              </li>
              <NavLink
                to="/admin/qr"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon icon={faQrcode} className="sidebar-icon" />
                  <span className="sidebar-text">Tables QR</span>
                </li>
              </NavLink>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
                  <span className="sidebar-text">Settings</span>
                </li>
              </NavLink>
              <li className="sidebar-item" onClick={logoutHandler}>
                <FontAwesomeIcon icon={faPowerOff} className="sidebar-icon" />
                <span className="sidebar-text">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="icons-sidebar sidebar d-block">
          <div className="sidebarWrapper">
            <ul className="sidebarList">
              <NavLink
                to="/admin/home"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
                title="Home"
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                </li>
              </NavLink>

              <NavLink
                to="/admin/menu"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
                title="Menu"
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon icon={faUtensils} className="sidebar-icon" />
                </li>
              </NavLink>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
                title="Orders"
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="sidebar-icon"
                  />
                </li>
              </NavLink>
              <NavLink
                to="/admin/coupons"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
                title="Coupons"
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon
                    icon={faPercentage}
                    className="sidebar-icon"
                  />
                </li>
              </NavLink>
              <li
                className="sidebar-item"
                onClick={() =>
                  window.open(
                    `/menu/${user.restaurantId}/1`,
                    "Restaurant live",
                    `width=460,height=${viewportheight},left=${+viewportwidth}`
                  )
                }
                title="Preview"
              >
                <i className="fas fa-rocket-launch"></i>
                <FontAwesomeIcon icon={faRocket} className="sidebar-icon" />
              </li>
              <NavLink
                to="/admin/qr"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
                title="QR"
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon icon={faQrcode} className="sidebar-icon" />
                </li>
              </NavLink>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  isActive ? "active-navlink" : undefined
                }
                title="Settings"
              >
                <li className="sidebar-item">
                  <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
                </li>
              </NavLink>
              <li
                className="sidebar-item"
                onClick={logoutHandler}
                title="Logout"
              >
                <FontAwesomeIcon icon={faPowerOff} className="sidebar-icon" />
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
