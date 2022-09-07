"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const Cart_1 = require("./Cart");
require("../styles/header.sass");
const react_1 = require("react");
const cart_slice_1 = require("../redux/cart.slice");
const store_hooks_1 = require("../redux/store.hooks");
const Header = () => {
    const [nav, setNav] = (0, react_1.useState)(false);
    const [cart, setCart] = (0, react_1.useState)(false);
    const cartTotalQuantity = (0, store_hooks_1.useAppSelector)(cart_slice_1.getTotalQuantiy);
    return (<>
      <header className="header">
        <a href="/" className="logo">
          <i className="fas fa-utensils"></i>Payfood
        </a>

        <nav className={`navbar ${nav && `active`}`} onClick={() => {
            setCart(false);
        }}>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#popular">Popular</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="icons">
          <div id="menu-btn" className="fas fa-bars menu-custom" onClick={() => {
            setNav(!nav);
            setCart(false);
        }}></div>
          <div>
            <div id="cart-btn" className="fas fa-shopping-cart cart-custom position-relative" onClick={() => setCart(!cart)}>
              {cartTotalQuantity > 0 && (<div className="quantity">{cartTotalQuantity}</div>)}
            </div>
          </div>
        </div>
      </header>
      {cart && <Cart_1.Cart />}
    </>);
};
exports.Header = Header;
