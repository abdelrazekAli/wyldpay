import axios from "axios";
import { useState } from "react";
import { CouponType } from "../../../types/Coupon";
import { getUser } from "../../../redux/user.slice";
import { useAppSelector } from "../../../redux/store.hooks";

export const AddCouponForm = ({
  hideForm,
  setCoupons,
}: {
  hideForm: () => void;
  setCoupons: (newItem: CouponType) => void;
}) => {
  const { accessToken } = useAppSelector(getUser);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponType, setCouponType] = useState<string | null>(null);
  const [couponValue, setCouponValue] = useState<number | null>(null);
  const [couponLimit, setCouponLimit] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Handle add coupon
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);

    try {
      const res = await axios.post(
        "/api/v1/coupons",
        {
          name: couponCode,
          type: couponType,
          value: couponValue,
          limit: couponLimit,
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );

      setisLoading(false);
      hideForm();
      setCoupons(res.data);
    } catch (err: any) {
      setisLoading(false);
      if (err.response.status === 409) {
        setError("Coupon name is already used.");
      } else {
        setError("Somthing went wrong!");
      }
    }
  };
  return (
    <div id="myModal" className="modal form-modal">
      <div className="modal-content p-relative custom-content">
        <span onClick={() => hideForm()} className="modal-close">
          &times;
        </span>
        <div className="main-content">
          <h2>Add coupon</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Code"
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <select
              name="type"
              className="custom-select select-minimal"
              onChange={(e) => setCouponType(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Type
              </option>
              <option value="percentage">Percentage</option>
              <option value="amount">Amount</option>
            </select>
            <input
              type="number"
              placeholder="Value"
              onChange={(e) => setCouponValue(+e.target.value)}
            />
            <input
              type="number"
              placeholder="Usage limit"
              onChange={(e) => setCouponLimit(+e.target.value)}
            />
            <button
              disabled={
                !couponCode ||
                !couponType ||
                !couponValue ||
                !couponLimit ||
                isLoading
              }
              type="submit"
              className="btn"
            >
              {isLoading ? "Loading..." : "Add"}
            </button>
          </form>
        </div>
        {error && (
          <span className="color-error text-center fs-2 my-1">{error}</span>
        )}
      </div>
    </div>
  );
};
