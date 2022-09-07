"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.decreseFromCart = exports.addToCart = exports.getTotalQuantiy = exports.getTotalPrice = exports.getCartProducts = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const cartSlice = (0, toolkit_1.createSlice)({
    name: "cart",
    initialState: JSON.parse(localStorage.getItem("cart") || "[]"),
    reducers: {
        addToCart: (state, action) => {
            const productIndex = state === null || state === void 0 ? void 0 : state.findIndex((product) => product.id === action.payload.id);
            if (productIndex !== -1 && state[productIndex]) {
                state[productIndex].quantity += 1;
            }
            else {
                state === null || state === void 0 ? void 0 : state.push(Object.assign(Object.assign({}, action.payload), { quantity: 1 }));
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        decreseFromCart: (state, action) => {
            const product = state === null || state === void 0 ? void 0 : state.find((product) => product.id === action.payload);
            const productIndex = state.findIndex((product) => product.id === action.payload);
            if ((product === null || product === void 0 ? void 0 : product.quantity) === 1) {
                return state === null || state === void 0 ? void 0 : state.filter((product) => product.id !== action.payload);
            }
            else {
                state[productIndex].quantity -= 1;
            }
            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            const filterState = state.filter((product) => product.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(filterState));
            return filterState;
        },
    },
});
const getCartProducts = (state) => state.cart;
exports.getCartProducts = getCartProducts;
const getTotalPrice = (state) => { var _a; return (_a = state.cart) === null || _a === void 0 ? void 0 : _a.reduce((acc, next) => (acc += next.quantity * next.price), 0); };
exports.getTotalPrice = getTotalPrice;
const getTotalQuantiy = (state) => { var _a; return (_a = state.cart) === null || _a === void 0 ? void 0 : _a.reduce((acc, next) => (acc += next.quantity), 0); };
exports.getTotalQuantiy = getTotalQuantiy;
_a = cartSlice.actions, exports.addToCart = _a.addToCart, exports.decreseFromCart = _a.decreseFromCart, exports.removeFromCart = _a.removeFromCart;
exports.default = cartSlice.reducer;
