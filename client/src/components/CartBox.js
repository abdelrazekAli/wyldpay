"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartBox = void 0;
const cart_slice_1 = require("../redux/cart.slice");
const store_hooks_1 = require("../redux/store.hooks");
const CartBox = ({ product }) => {
    const dispatch = (0, store_hooks_1.useAppDispatch)();
    const RemoveFromCartHandler = (productId) => {
        dispatch((0, cart_slice_1.removeFromCart)(productId));
    };
    return (<div className="box">
      <i className="fas fa-times" onClick={() => RemoveFromCartHandler(product.id)}></i>
      <img src={`./assets/images/${product.img}`} alt=""/>
      <div className="content">
        <h3>
          {product.quantity > 1
            ? `${product.quantity} * ${product.name}`
            : product.name}
        </h3>
        {/* <span> quantity : </span>
        <span className="price"> {product.quantity}</span> */}
        <br />
        <span> price : </span>
        <span className="price">
          ${(product.quantity * product.price).toFixed(2)}
        </span>
      </div>
    </div>);
};
exports.CartBox = CartBox;
