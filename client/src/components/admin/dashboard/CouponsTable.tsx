import axios from "axios";
import "../../../styles/coupons.sass";
import { useEffect, useState } from "react";
import { CouponType } from "../../../types/Coupon";
import { getUser } from "../../../redux/user.slice";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const CouponsTable = () => {
  const { currency, accessToken } = useAppSelector(getUser);
  const [coupons, setCoupons] = useState<CouponType[] | null>();
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [couponType, setCouponType] = useState<string | null>(null);
  const [couponValue, setCouponValue] = useState<number | null>(null);
  const [couponLimit, setCouponLimit] = useState<number | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  useEffect(() => {
    // Fetch coupons
    const fetchCoupons = async () => {
      const res = await axios.get(`/api/v1/coupons`, {
        headers: {
          "auth-token": accessToken,
        },
      });
      setCoupons(res.data);
    };
    fetchCoupons();
  }, []);

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

      setCoupons([...coupons!, res.data]);
      setFormVisible(!isFormVisible);
      setisLoading(false);
    } catch (err: any) {
      setisLoading(false);
      if (err.response.status === 409) {
        setError("Coupon name is already used.");
      } else {
        setError("Somthing went wrong!");
      }
    }
  };

  // Handle delete item
  const handleDeleteItem = async (couponId: string) => {
    const filterCoupons = coupons?.filter((i) => i._id !== couponId);
    setCoupons(filterCoupons);
    try {
      await axios.delete(`/api/v1/coupons/${couponId}`, {
        headers: {
          "auth-token": accessToken,
        },
      });
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
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
      )}
      <div className="coupons-table">
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
                <Tr key={i}>
                  <Td>{i + 1}</Td>
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
                      onClick={() => handleDeleteItem(coupon._id)}
                    >
                      Delete
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {coupons?.length === 0 && (
            <div className="justify-content-center">
              <div className="no-items">No coupons added yet</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
