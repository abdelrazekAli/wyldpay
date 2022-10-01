import "../../styles/menu/itemDetails.sass";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ProductType } from "../../types/Product";
import { useAppDispatch, useAppSelector } from "../../redux/store.hooks";
import {
  getCartProducts,
  addToCart,
  decreseFromCart,
} from "../../redux/cart.slice";

export const MainItemDetails = () => {
  const navigate = useNavigate(),
    product = useLocation().state as ProductType;
  const [details, setDetails] = useState<boolean>(false);

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
    <div className="item-details-wrapper">
      <div
        className="item-details"
        style={{
          backgroundImage: `url(../../../../assets/images/item-details.svg)`,
        }}
      >
        <div className="back-icon" onClick={() => navigate(-1)}>
          <i className="fas fa-chevron-left"></i>
        </div>
      </div>
      <div className="content">
        <h1 className="heading-1 capitalize">{product.name}</h1>
        <div className="price-counters-wrapper">
          <div className="price">€{product.price.toFixed(2)}</div>
          <div className="counters-container">
            <div className="counters-wrapper">
              <>
                <button className="counter" onClick={decrementHanldler}>
                  <img
                    className="counter-img"
                    src={`../../../../assets/images/minus.svg`}
                    alt=""
                  />
                </button>
                <h4 className="quantity">{counter === 0 ? 1 : counter}</h4>
              </>
              <button className="counter" onClick={incrementHanldler}>
                <img
                  className="counter-img"
                  src={`../../../../assets/images/plus.svg`}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
        <h2 className="heading-2">About food</h2>
        <p className="description">{product.desc}</p>
        <div className="ingredients" onClick={() => setDetails(!details)}>
          <span>Ingredients</span>
          <i className="fas fa-chevron-down"></i>
        </div>
        {details && (
          <div className="details">
            <div>
              <i className="fa fa-check" aria-hidden="true"></i>1 tbsp vegetable
              oil
            </div>
            <div>
              <i className="fa fa-check" aria-hidden="true"></i>2 cup fine dry
              bread
            </div>
            <div>
              <i className="fa fa-check" aria-hidden="true"></i>500g
              good-quality beef mince
            </div>
          </div>
        )}
        <div className="order" onClick={() => navigate(-1)}>
          Add {counter === 0 ? 1 : counter} to order -{" "}
          {counter === 0 ? 1 * product.price : counter * product.price}
        </div>
      </div>
    </div>
  );
};
