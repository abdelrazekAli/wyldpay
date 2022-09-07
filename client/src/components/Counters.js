"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counters = void 0;
const react_1 = require("react");
const store_hooks_1 = require("../redux/store.hooks");
const cart_slice_1 = require("../redux/cart.slice");
const Counters = ({ product }) => {
    var _a;
    const dispatch = (0, store_hooks_1.useAppDispatch)();
    const cartProducts = (0, store_hooks_1.useAppSelector)(cart_slice_1.getCartProducts);
    const productQuantity = ((_a = cartProducts.find((p) => p.id === product.id)) === null || _a === void 0 ? void 0 : _a.quantity) || 0;
    const [counter, setCounter] = (0, react_1.useState)(productQuantity);
    const [decreaseCounter, setDecreaseCounter] = (0, react_1.useState)(false);
    const addToCartHandler = (product) => {
        dispatch((0, cart_slice_1.addToCart)(product));
    };
    const decreseFromCartHandler = (productId) => {
        dispatch((0, cart_slice_1.decreseFromCart)(productId));
    };
    const incrementHanldler = () => {
        if (counter < 99) {
            setCounter(counter + 1);
            addToCartHandler(product);
            !decreaseCounter && setDecreaseCounter(!decreaseCounter);
        }
    };
    const decrementHanldler = () => {
        setCounter(counter - 1);
        decreseFromCartHandler(product.id);
        counter === 0 && setDecreaseCounter(!decreaseCounter);
    };
    return (<div className="counter-container">
      {counter > 0 && (<>
          <div className="counter custom-padding" onClick={decrementHanldler}>
            -
          </div>
          <div className="quantity">{counter}</div>
        </>)}
      <div className="counter" onClick={incrementHanldler}>
        +
      </div>
    </div>);
};
exports.Counters = Counters;
