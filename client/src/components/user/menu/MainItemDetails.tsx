import { useState } from "react";
import "../../../styles/menu/itemDetails.sass";
import { ProductType } from "../../../types/Product";
import { addToCart } from "../../../redux/cart.slice";
import { useAppDispatch } from "../../../redux/store.hooks";
import { useNavigate, useLocation } from "react-router-dom";

export const MainItemDetails = () => {
  const navigate = useNavigate(),
    product = useLocation().state as ProductType;

  const dispatch = useAppDispatch();
  const [counter, setCounter] = useState<number>(1);
  const [details, setDetails] = useState<boolean>(false);

  const addToCartHandler = (product: ProductType) => {
    dispatch(addToCart(product));
  };

  const submitHandler = () => {
    navigate(-1);
    for (let i = 0; i < counter; i++) {
      addToCartHandler(product);
    }
  };

  return (
    <div className="item-details-wrapper">
      <div
        className="item-details"
        style={{
          backgroundImage: `url(../../../../assets/images/item-details.png)`,
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
                <button
                  className="counter"
                  onClick={() => setCounter(counter - 1)}
                  disabled={counter === 1}
                >
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
                onClick={() => setCounter(counter + 1)}
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
        <div className="order" onClick={submitHandler}>
          Add {counter} to order -{" "}
          <span className="font-bold">
            €
            {counter === 0
              ? 1 * product.price
              : (counter * product.price).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
