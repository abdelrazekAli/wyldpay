import axios from "axios";
import TimeAgo from "react-timeago";
import "../../../styles/orders.sass";
import { useEffect, useState } from "react";
import { Order } from "../../../types/Order";
import { getUser } from "../../../redux/user.slice";
import { CircularProgress } from "@material-ui/core";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { RestaurantProps } from "../../../types/Restaurant";
import { downloadReceipt } from "../../../utils/orderReceipt";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { _id, currency, accessToken } = useAppSelector(getUser);
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
        setRestaurant(res.data);

        setisLoading(false);
      } catch (err) {
        console.log(err);
        setisLoading(false);
        setError("Somthing went wrong on fetch orders!");
      }
    };
    fetchData();
  }, [_id, accessToken]);

  return (
    <div className="orders-table">
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
              {orders?.map((order, i) => (
                <Tr key={i}>
                  <Td>{order._id.substring(0, 8)}</Td>
                  <Td>{order.tableNum}</Td>
                  <Td>
                    <TimeAgo date={order.createdAt} />
                  </Td>
                  <Td>
                    {order.items.map(
                      (item, i, row) =>
                        item.quantity +
                        " x " +
                        item.name +
                        (row.length !== i + 1 && ", ")
                    )}
                  </Td>
                  <Td>{order.notes}</Td>
                  <Td>
                    {order.totalPrice.toFixed(2)}
                    {getSymbol(currency)}
                  </Td>
                  <Td>{order.paymentMethod}</Td>
                  <Td onClick={() => downloadReceipt(order, restaurant!)}>
                    <span className="color-main cursor-pointer">Download</span>
                  </Td>
                </Tr>
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
