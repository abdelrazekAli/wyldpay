import TimeAgo from "react-timeago";
import { Order } from "../../../types/Order";
import { getUser } from "../../../redux/user.slice";
import { Tr, Td } from "react-super-responsive-table";
import { getSymbol } from "../../../utils/currencySymbol";
import { useAppSelector } from "../../../redux/store.hooks";
import { RestaurantProps } from "../../../types/Restaurant";
import { downloadReceipt } from "../../../utils/orderReceipt";

export const OrderRow = ({
  order,
  restaurant,
}: {
  order: Order;
  restaurant: RestaurantProps;
}) => {
  const { currency } = useAppSelector(getUser);

  return (
    <Tr>
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
            (row.length !== i + 1 ? ", " : "")
        )}
      </Td>
      <Td>{order.notes}</Td>
      <Td>
        {order.totalPrice.toFixed(2)}
        {getSymbol(currency)}
      </Td>
      <Td>{order.paymentMethod}</Td>
      <Td onClick={() => downloadReceipt(order, restaurant)}>
        <span className="color-main cursor-pointer">Download</span>
      </Td>
    </Tr>
  );
};
