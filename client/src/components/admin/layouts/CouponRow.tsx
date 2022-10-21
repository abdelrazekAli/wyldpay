import axios from "axios";
import { useState } from "react";
import { CouponType } from "../../../types/Coupon";
import { getUser } from "../../../redux/user.slice";
import { Tr, Td } from "react-super-responsive-table";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";

export const CouponRow = ({
  coupon,
  counter,
  onDelete,
}: {
  coupon: CouponType;
  counter: number;
  onDelete: (couponId: string) => void;
}) => {
  const { currency, accessToken } = useAppSelector(getUser);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const deleteCoupon = async (couponId: string) => {
    setisLoading(true);
    try {
      await axios.delete(`/api/v1/coupons/${couponId}`, {
        headers: {
          "auth-token": accessToken,
        },
      });
      setisLoading(false);
      onDelete(coupon._id);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };
  return (
    <Tr>
      <Td>{counter + 1}</Td>
      <Td>{coupon.name}</Td>
      <Td className="capitalize">{coupon.type}</Td>
      <Td>
        {coupon.value}
        {coupon.type === "amount" ? getSymbol(currency) : "%"}
      </Td>
      <Td>{coupon.limit}</Td>
      <Td>{coupon.usage}</Td>
      <Td>
        <button
          className="delete-btn"
          onClick={() => deleteCoupon(coupon._id)}
          disabled={isLoading}
        >
          {!isLoading ? "Delete" : "Deleting..."}
        </button>
      </Td>
      {error && (
        <span className="color-error text-center fs-3 my-2 w-100 d-block">
          {error}
        </span>
      )}
    </Tr>
  );
};
