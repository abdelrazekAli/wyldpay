"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const cart_slice_1 = __importDefault(require("./cart.slice"));
const products_slice_1 = __importDefault(require("./products.slice"));
const toolkit_1 = require("@reduxjs/toolkit");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        products: products_slice_1.default,
        cart: cart_slice_1.default,
    },
});
