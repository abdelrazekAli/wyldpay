import axios from "axios";
import { useEffect, useState } from "react";
import "../../../styles/menu/itemDetails.sass";
import { ProductType } from "../../../types/Product";
import { CircularProgress } from "@material-ui/core";
import { addToCart } from "../../../redux/cart.slice";
import { getSymbol } from "../../../utils/currencySymbol";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import {
  faCheck,
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export const MainItemDetails = () => {
  const navigate = useNavigate();
  const { itemId, tableId, restId } = useParams();

  const dispatch = useAppDispatch();
  const currency = useAppSelector(getRestaurantCurrency);

  const [item, setItem] = useState<ProductType>();
  const [counter, setCounter] = useState<number>(1);
  const [details, setDetails] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch item
    const fetchItem = async () => {
      setError(false);
      setisLoading(true);
      try {
        const res = await axios.get(`/api/v1/items/${itemId}`);
        setItem(res.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
        setError(true);
        setisLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const addToCartHandler = (product: ProductType) => {
    item && dispatch(addToCart(item));
  };

  const submitHandler = () => {
    navigate(`/menu/${restId}/${tableId}`);
    for (let i = 0; i < counter; i++) {
      item && addToCartHandler(item);
    }
  };

  return (
    <div className="item-details-wrapper">
      {error && (
        <span className="error color-error d-block mt-4 text-center fs-3">
          Something went wrong!
        </span>
      )}

      {isLoading && (
        <div className="p-5 text-center">
          <CircularProgress color="inherit" size="25px" />
        </div>
      )}
      {item && (
        <>
          <div
            className="item-details"
            style={{
              backgroundImage: `url(${item.img})`,
            }}
          >
            <div
              className="back-icon"
              onClick={() => navigate(`/menu/${restId}/${tableId}`)}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="left-arrow" />
            </div>
          </div>
          <div className="content">
            <h1 className="heading-1 capitalize">{item.name}</h1>
            <div className="price-counters-wrapper">
              <div className="price">
                {getSymbol(currency)}
                {item.price.toFixed(2)}
              </div>
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
            <p className="description">{item.desc}</p>
            <div className="ingredients" onClick={() => setDetails(!details)}>
              <span>Ingredients</span>
              <FontAwesomeIcon icon={faChevronDown} className="down-arrow" />
            </div>
            {details && (
              <div className="details">
                <div>
                  <FontAwesomeIcon icon={faCheck} className="down-arrow" />
                  {item.ingredients}
                </div>
              </div>
            )}
            <div className="order" onClick={submitHandler}>
              Add {counter} to order -{" "}
              <span className="font-bold">
                {getSymbol(currency)}
                {counter === 0
                  ? 1 * item.price
                  : (counter * item.price).toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
