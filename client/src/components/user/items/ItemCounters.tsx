import { useState } from "react";
import { ProductType, ProductPropType } from "../../../types/Product";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import {
  getCartProducts,
  addToCart,
  decreseFromCart,
} from "../../../redux/cart.slice";

export const ItemCounters = ({ product }: ProductPropType) => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(getCartProducts);

  const productQuantity =
    cartProducts.find((p) => p._id === product._id)?.quantity || 0;

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
    decreseFromCartHandler(product._id);
    counter === 0 && setDecreaseCounter(!decreaseCounter);
  };

  return (
    <div className="counters-container">
      <div className="counters-wrapper">
        {counter > 0 && (
          <>
            <button className="counter" onClick={decrementHanldler}>
              <img
                className="counter-img"
                src={`../../assets/images/minus.svg`}
                alt=""
              />
            </button>
            <h4 className="quantity">{counter}</h4>
          </>
        )}
        <button className="counter" onClick={incrementHanldler}>
          <img
            className="counter-img"
            src={`../../assets/images/plus.svg`}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};
