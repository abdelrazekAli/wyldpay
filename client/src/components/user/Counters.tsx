import { useState } from "react";
import { ProductType, ProductPropType } from "../../types/Product";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import {
  getCartProducts,
  addToCart,
  decreseFromCart,
} from "../../redux/cart.slice";

export const Counters = ({ product }: ProductPropType) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);

  const productQuantity =
    cartProducts.find((p) => p.id === product.id)?.quantity || 0;

  const [counter, setCounter] = useState<number>(productQuantity);

  const [decreaseCounter, setDecreaseCounter] = useState<boolean>(false);

  const addToCartHandler = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  const decreseFromCartHandler = (productId: number) => {
    dispatch(decreseFromCart(productId));
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

  return (
    <div className="counter-container">
      {counter > 0 && (
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
