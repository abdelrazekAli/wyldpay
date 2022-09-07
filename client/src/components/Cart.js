"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
require("../styles/cart.sass");
const Payment_1 = require("./Payment");
const CartBox_1 = require("./CartBox");
const stripe_js_1 = require("@stripe/stripe-js");
const react_stripe_js_1 = require("@stripe/react-stripe-js");
const store_hooks_1 = require("../redux/store.hooks");
const cart_slice_1 = require("../redux/cart.slice");
const stripePromise = (0, stripe_js_1.loadStripe)("pk_test_51LdvPDBRtbtj7sFC444B41pH4fmLBfO43mrGuaZUJMU9wTmFBMismkDsSo8mqvijs4RYG6eK3VELTCMawtUJ3Cfu004k3dFn30");
const Cart = () => {
    const cartProducts = (0, store_hooks_1.useAppSelector)(cart_slice_1.getCartProducts);
    const subPrice = (0, store_hooks_1.useAppSelector)(cart_slice_1.getTotalPrice);
    const totalPrice = subPrice + 0.1 * subPrice;
    return (<section className="shopping-cart-container active">
      {(cartProducts === null || cartProducts === void 0 ? void 0 : cartProducts.length) > 0 ? (<>
          <div className="products-container">
            <h3 className="title">Your foods</h3>

            <div className="box-container">
              {cartProducts.map((p) => (<CartBox_1.CartBox key={p.id} product={p}/>))}
            </div>
          </div>

          <div className="cart-total">
            <h3 className="title">Payment</h3>
            <div className="box">
              <h3 className="subtotal">
                Subtotal : <span>${subPrice}</span>
              </h3>
              <h3 className="total">
                Total : <span>${totalPrice}</span>
              </h3>
              <react_stripe_js_1.Elements stripe={stripePromise}>
                <Payment_1.Payment totalPrice={totalPrice}/>
              </react_stripe_js_1.Elements>
            </div>
          </div>
        </>) : (<div className="products-container">
          <div className="image">
            <img src="./assets/images/shopping-bag.svg" alt=""/>
          </div>
          <h3 className="title custom-title">Your foods cart is empty</h3>
        </div>)}
    </section>);
};
exports.Cart = Cart;
