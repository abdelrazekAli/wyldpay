import "../../../styles/orders.sass";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export const OrdersTable = () => {
  return (
    <div className="orders-table">
      <div className="container">
        <h3>Orders</h3>
        <Table>
          <Thead>
            <Tr>
              <Th>Table #</Th>
              <Th>Order #</Th>
              <Th>Date</Th>
              <Th>Order</Th>
              <Th>Price</Th>
              <Th>Notes</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>3424518</Td>
              <Td>just now</Td>
              <Td>2*Louis Pizza, 4*Chilli burger</Td>
              <Td>80.50€</Td>
              <Td>More mozzarella for pizzas</Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>3424519</Td>
              <Td>3m ago</Td>
              <Td>2*Louis Pizza, 4*Chilli burger</Td>
              <Td>80.50€</Td>
              <Td>More mozzarella for pizzas</Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>3424520</Td>
              <Td>6m ago</Td>
              <Td>2*Louis Pizza, 4*Chilli burger</Td>
              <Td>80.50€</Td>
              <Td>More mozzarella for pizzas</Td>
            </Tr>
            <Tr>
              <Td>4</Td>
              <Td>3424521</Td>
              <Td>8m ago</Td>
              <Td>2*Louis Pizza, 4*Chilli burger</Td>
              <Td>80.50€</Td>
              <Td>More mozzarella for pizzas</Td>
            </Tr>
            <Tr>
              <Td>5</Td>
              <Td>3424522</Td>
              <Td>10m ago</Td>
              <Td>2*Louis Pizza, 4*Chilli burger</Td>
              <Td>80.50€</Td>
              <Td>More mozzarella for pizzas</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </div>
  );
};
