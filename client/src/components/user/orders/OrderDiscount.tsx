import axios from "axios";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { getSymbol } from "../../../utils/currencySymbol";
import { getRestaurantCurrency } from "../../../redux/restaurant.slice";
import { addDiscount, getDiscount } from "../../../redux/discount.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";

export const OrderDiscount = () => {
  const { restId } = useParams();
  const dispatch = useAppDispatch();
  const discount = useAppSelector(getDiscount);
  const discountCode = useRef<HTMLInputElement>(null!);
  const currency = useAppSelector(getRestaurantCurrency);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const handleSubmitDiscount = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);

    // Check if no discount code
    if (!discountCode.current.value)
      return setError("Discount code is required");

    try {
      setisLoading(true);
      const res = await axios.post(`/api/v1/coupons/${restId}`, {
        couponCode: String(discountCode.current.value).trim(),
      });

      dispatch(addDiscount(res.data));
      setFormVisible(!isFormVisible);
    } catch (err: any) {
      console.log(err);
      setisLoading(false);
      if (err.response.status === 409) {
        return setError("Discount code is not valid");
      }
      setError("Something went wrong!");
    }
  };

  return (
    <>
      {isFormVisible && (
        <div id="myModal" className="modal form-modal">
          <div className="modal-content p-relative custom-content">
            <span
              onClick={() => setFormVisible(!isFormVisible)}
              className="modal-close"
            >
              &times;
            </span>
            <div className="main-content">
              <h2>Enter discount code</h2>
              <form onSubmit={handleSubmitDiscount}>
                <input
                  type="text"
                  ref={discountCode}
                  className="mb-1"
                  onChange={() => setError(null)}
                />
                <span className="error color-error d-block fs-1 mb-1">
                  {error}
                </span>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn btn-flex"
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size="20px" />
                  ) : (
                    "Enter"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {discount ? (
        <div className="discount-wrapper border-none justify-content-center">
          <div className="text g-1">
            <img src="../../../assets/images/discount.svg" alt="" />
            Discount of {discount.value}
            {discount.type === "amount" ? getSymbol(currency) : "%"} is valid
          </div>
        </div>
      ) : (
        <div
          className="discount-wrapper"
          onClick={() => {
            setError("");
            setisLoading(false);
            setFormVisible(!isFormVisible);
          }}
        >
          <div className="text">
            <img src="../../../assets/images/discount.svg" alt="" />
            Add discount code
          </div>
          <div className="icon">
            <img src="../../../assets/images/open-right.svg" alt="" />
          </div>
        </div>
      )}
    </>
  );
};
