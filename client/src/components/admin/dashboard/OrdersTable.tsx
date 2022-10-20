import axios from "axios";
import "../../../styles/orders.sass";
import { useEffect, useState } from "react";
import { Order } from "../../../types/Order";
import { OrderRow } from "../layouts/OrderRow";
import { getUser } from "../../../redux/user.slice";
import { CircularProgress } from "@material-ui/core";
import { useAppSelector } from "../../../redux/store.hooks";
import { RestaurantProps } from "../../../types/Restaurant";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { _id, accessToken } = useAppSelector(getUser);
  const [restaurant, setRestaurant] = useState<RestaurantProps | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch ordrs
        const orderResponse = await axios.get(`/api/v1/orders`, {
          headers: {
            "auth-token": accessToken,
          },
        });
        setOrders(orderResponse.data);

        // Fetch restaurant
        const res = await axios.get(`/api/v1/restaurants/user/${_id}`);

        setisLoading(false);
        setRestaurant(res.data);
      } catch (err) {
        console.log(err);
        setisLoading(false);
        setError("Somthing went wrong on fetch orders!");
      }
    };
    fetchData();
  }, [_id, accessToken]);

  return (
    <div className="orders-table w-100">
      {!isLoading ? (
        <div className="container">
          <h3>Orders</h3>
          <Table>
            <Thead>
              <Tr>
                <Th>Order #</Th>
                <Th>Table #</Th>
                <Th>Date</Th>
                <Th>Items</Th>
                <Th>Notes</Th>
                <Th>
                  Price <span className="small-note">(Tip included)</span>
                </Th>
                <Th>P.M</Th>
                <Th>Receipt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.map((order) => (
                <OrderRow
                  key={order._id}
                  order={order}
                  restaurant={restaurant!}
                />
              ))}
            </Tbody>
          </Table>
          {error ? (
            <span className="color-error text-center fs-3 my-2 w-100 d-block">
              {error}
            </span>
          ) : (
            orders?.length === 0 && (
              <div className="justify-content-center">
                <div className="no-items">There are no orders yet</div>
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
  );
};
