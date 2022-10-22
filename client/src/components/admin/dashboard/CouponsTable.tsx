import axios from "axios";
import "../../../styles/coupons.sass";
import { useEffect, useState } from "react";
import { CouponRow } from "../layouts/CouponRow";
import { CouponType } from "../../../types/Coupon";
import { getUser } from "../../../redux/user.slice";
import { CircularProgress } from "@material-ui/core";
import { AddCouponForm } from "../forms/AddCouponForm";
import { useAppSelector } from "../../../redux/store.hooks";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const CouponsTable = () => {
  const { accessToken } = useAppSelector(getUser);
  const [coupons, setCoupons] = useState<CouponType[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  useEffect(() => {
    // Fetch coupons
    const fetchCoupons = async () => {
      try {
        const res = await axios.get(`/api/v1/coupons`, {
          headers: {
            "auth-token": accessToken,
          },
        });

        setisLoading(false);
        setCoupons(res.data);
      } catch (err) {
        console.log(err);
        setisLoading(false);
        setError("Somthing went wrong on fetch coupons!");
      }
    };
    fetchCoupons();
  }, [accessToken]);

  // Handle on delete coupon
  const handleDeleteCoupon = async (couponId: string) => {
    const filterCoupons = coupons?.filter((i) => i._id !== couponId);
    setCoupons(filterCoupons);
  };

  return (
    <>
      {isFormVisible && (
        <AddCouponForm
          hideForm={() => setFormVisible(!isFormVisible)}
          setCoupons={(newCoupon) => setCoupons([...coupons!, newCoupon])}
        />
      )}
      <div className="coupons-table w-100">
        {!isLoading ? (
          <div className="container">
            <div className="btn-container">
              <button
                type="submit"
                className="btn"
                onClick={() => {
                  setFormVisible(!isFormVisible);
                }}
              >
                + Add coupon
              </button>
            </div>
            <h3>Coupons</h3>

            <Table>
              <Thead>
                <Tr>
                  <Th>#</Th>
                  <Th>Code</Th>
                  <Th>Type</Th>
                  <Th>Value</Th>
                  <Th>Limit</Th>
                  <Th>Usage</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {coupons?.map((coupon, i) => (
                  <CouponRow
                    key={i}
                    coupon={coupon}
                    counter={i}
                    onDelete={(couponId) => handleDeleteCoupon(couponId)}
                  />
                ))}
              </Tbody>
            </Table>
            {error ? (
              <span className="color-error text-center fs-3 my-2 w-100 d-block">
                {error}
              </span>
            ) : (
              coupons?.length === 0 && (
                <div className="justify-content-center">
                  <div className="no-items">There are no coupons yet</div>
                </div>
              )
            )}
          </div>
        ) : (
          <div className="p-5 text-center mt-5">
            <CircularProgress color="inherit" size="25px" />
          </div>
        )}
      </div>
    </>
  );
};
