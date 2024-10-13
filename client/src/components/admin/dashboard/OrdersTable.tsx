import "../../../styles/orders.sass";
import { useEffect, useState } from "react";
import { Order } from "../../../types/Order";
import { OrderRow } from "../layouts/OrderRow";
import { Modal } from "../../user/layouts/Modal";
import { getUser } from "../../../redux/user.slice";
import { fetchData } from "../../../utils/fetchData";
import { Subscription } from "../../../types/Subscription";
import { useAppSelector } from "../../../redux/store.hooks";
import { RestaurantProps } from "../../../types/Restaurant";
import { CircularProgress, Pagination } from "@mui/material";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const OrdersTable = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { _id, accessToken } = useAppSelector(getUser);
  const [restaurant, setRestaurant] = useState<RestaurantProps | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[] | null>(
    null
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch subscriptions
    fetchData<Subscription[]>(
      `${process.env.REACT_APP_API_VERSION!}/subscriptions/users/check/`,
      accessToken,
      setSubscriptions,
      setError,
      setIsLoading,
      "POST",
      { userId: _id }
    );

    // Fetch orders
    fetchData<{
      orders: Order[];
      totalOrders: number;
      currentPage: number;
      totalPages: number;
    }>(
      `${process.env
        .REACT_APP_API_VERSION!}/orders?page=${currentPage}&limit=${itemsPerPage}`,
      accessToken,
      (data) => {
        setOrders(data.orders);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      },
      setError,
      setIsLoading
    );

    // Fetch restaurant
    fetchData<RestaurantProps>(
      `${process.env.REACT_APP_API_VERSION!}/restaurants/user/${_id}`,
      accessToken,
      setRestaurant,
      setError,
      setIsLoading
    );
  }, [_id, accessToken, currentPage]);

  // handle page numer change for pagination
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value); // Update current page to the selected page
  };

  return (
    <div className="orders-table w-100">
      {!isLoading ? (
        subscriptions?.length === 0 ? (
          <Modal status="no-subscription" />
        ) : (
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
            <div className="justify-content-center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                sx={{ mt: 3 }}
                size="large"
              />
            </div>

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
        )
      ) : (
        <div className="p-5 text-center mt-5">
          <CircularProgress color="inherit" size="25px" />
        </div>
      )}
    </div>
  );
};
