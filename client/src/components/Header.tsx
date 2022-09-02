import { Cart } from "./Cart";
import "../styles/header.sass";
import { useState } from "react";
import { getTotalQuantiy } from "../redux/cart.slice";
import { useAppSelector } from "../redux/store.hooks";

export const Header = () => {
  const [nav, setNav] = useState(false);
  const [cart, setCart] = useState(false);
  const cartTotalQuantity = useAppSelector(getTotalQuantiy);

  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          <i className="fas fa-utensils"></i>payfood
        </a>

        <nav
          className={`navbar ${nav && `active`}`}
          onClick={() => {
            setCart(false);
          }}
        >
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#popular">popular</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="icons">
          <div
            id="menu-btn"
            className="fas fa-bars menu-custom"
            onClick={() => {
              setNav(!nav);
              setCart(false);
            }}
          ></div>
          <div>
            <div
              id="cart-btn"
              className="fas fa-shopping-cart cart-custom position-relative"
              onClick={() => setCart(!cart)}
            >
              {cartTotalQuantity > 0 && (
                <div className="quantity">{cartTotalQuantity}</div>
              )}
            </div>
          </div>
        </div>
      </header>
      {cart && <Cart />}
    </>
  );
};
