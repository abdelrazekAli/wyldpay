import "../styles/header.sass";
import { Cart } from "./Cart";
import { useState } from "react";

export const Header = () => {
  const [cart, setCart] = useState(false);
  return (
    <>
      <header className="header">
        <a href="/" className="logo">
          <i className="fas fa-utensils"></i>payfood
        </a>

        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#offers">Offers</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="icons">
          <div id="menu-btn" className="fas fa-bars"></div>
          <div
            id="cart-btn"
            className="fas fa-shopping-cart"
            onClick={() => setCart(!cart)}
          ></div>
        </div>
      </header>
      {cart && <Cart />}
    </>
  );
};
