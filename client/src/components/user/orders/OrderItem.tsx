import { useState } from "react";
import { truncate } from "../../../utils/stringTruncate";
import { getSymbol } from "../../../utils/currencySymbol";
import { ProductPropType, ProductType } from "../../../types/Product";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import {
  addToCart,
  decreaseFromCart,
  removeFromCart,
} from "../../../redux/cart.slice";

export const OrderItem = ({ product }: ProductPropType) => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector(getRestaurantCurrency);

  const [counter, setCounter] = useState<number>(product.quantity!);
  const [decreaseCounter, setDecreaseCounter] = useState<boolean>(false);

  const addToCartHandler = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  const decreaseFromCartHandler = (productId: number) => {
    dispatch(decreaseFromCart(productId));
  };

  const incrementHandler = () => {
    if (counter < 99) {
      setCounter(counter + 1);
      addToCartHandler(product);
      !decreaseCounter && setDecreaseCounter(!decreaseCounter);
    }
  };

  const decrementHandler = () => {
    if (counter === 1) return dispatch(removeFromCart(product._id));
    setCounter(counter - 1);
    decreaseFromCartHandler(product._id);
  };
  return (
    <div className="order-item">
      <div className="order-item-img-wrapper">
        <div>
          <img className="order-item-img" src={product.img} alt="" />
        </div>
      </div>
      <div className="order-item-texts">
        <h2 className="capitalize">{product.name}</h2>
        <p>
          {" "}
          {product.desc.length > 50 ? truncate(product.desc, 50) : product.desc}
        </p>
      </div>
      <div className="counters-price-wrapper">
        <div className="counters-container">
          <div className="counters-wrapper">
            <>
              <button className="counter" onClick={decrementHandler}>
                <img
                  className="counter-img"
                  src={`../../../../assets/images/minus.svg`}
                  alt=""
                />
              </button>
              <h4 className="quantity">{counter}</h4>
            </>
            <button
              className="counter"
              onClick={incrementHandler}
              disabled={counter >= 99}
            >
              <img
                className="counter-img"
                src={`../../../../assets/images/plus.svg`}
                alt=""
              />
            </button>
          </div>
        </div>
        <span>
          {getSymbol(currency)}
          {(counter * product.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
