import "../styles/header.sass";
import { Cart } from "./Cart";
import { useState } from "react";

export const Header = () => {
  const [nav, setNav] = useState(false);
  const [cart, setCart] = useState(false);
  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          <i className="fas fa-utensils"></i>payfood
        </a>

        <nav className={`navbar ${nav && `active`}`}>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#offers">Offers</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="icons">
          <div
            id="menu-btn"
            className="fas fa-bars menu-custom"
            onClick={() => setNav(!nav)}
          ></div>
          <div>
            <div
              id="cart-btn"
              className="fas fa-shopping-cart cart-custom position-relative"
              onClick={() => setCart(!cart)}
            >
              <div className="quantity">3</div>
            </div>
          </div>
        </div>
      </header>
      {cart && <Cart />}
    </>
  );
};
