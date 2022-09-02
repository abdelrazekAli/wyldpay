import { useState } from "react";
import { useAppDispatch } from "../redux/store.hooks";
import { ProductType, ProductPropType } from "../types/Product";
import { addToCart, decreseFromCart } from "../redux/cart.slice";

export const Counters = ({ product }: ProductPropType) => {
  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState(0);
  const [decreaseCounter, setDecreaseCounter] = useState(false);

  const addToCartHandler = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  const decreseFromCartHandler = (productId: number) => {
    dispatch(decreseFromCart(productId));
  };

  const incrementHanldler = () => {
    setCounter(counter + 1);
    addToCartHandler(product);
    !decreaseCounter && setDecreaseCounter(!decreaseCounter);
  };

  const decrementHanldler = () => {
    setCounter(counter - 1);
    decreseFromCartHandler(product.id);
    counter === 0 && setDecreaseCounter(!decreaseCounter);
  };

  return (
    <div className="counter-container">
      {decreaseCounter && counter > 0 && (
        <>
          <div className="counter custom-padding" onClick={decrementHanldler}>
            -
          </div>
          <div className="quantity">{counter}</div>
        </>
      )}
      <div className="counter" onClick={incrementHanldler}>
        +
      </div>
    </div>
  );
};
