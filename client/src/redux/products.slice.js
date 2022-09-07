"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsSelector = exports.addProducts = void 0;
const dummyData_1 = require("../dummyData");
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = dummyData_1.mainProducts;
const productsSlice = (0, toolkit_1.createSlice)({
    name: "products",
    initialState,
    reducers: {
        addProducts: (state, action) => {
            return [action.payload, ...state];
        },
    },
});
exports.addProducts = productsSlice.actions.addProducts;
const getProductsSelector = (state) => state.products;
exports.getProductsSelector = getProductsSelector;
exports.default = productsSlice.reducer;
