import jsPDF from "jspdf";
import { Order } from "../types/Order";
import autoTable from "jspdf-autotable";
import { getSymbol } from "./currencySymbol";
import { RestaurantProps } from "../types/Restaurant";

export const downloadReceipt = (order: Order, restaurant: RestaurantProps) => {
  // Push order items to table body
  let tableRows: any = [];
  order.items.forEach((item) =>
    tableRows?.push([
      item.name,
      item.quantity!,
      getSymbol(restaurant.currency) + item.price.toFixed(2),
      getSymbol(restaurant.currency) + (item.quantity! * item.price).toFixed(2),
    ])
  );

  // Calc total items amount
  const subPrice = +order.items.reduce(
    (acc, next) => (acc += next.quantity! * next.price),
    0
  );

  // Calc VAT amount
  const VatAmount = +(subPrice * (restaurant.vatPercentage / 100));

  // Calc total price
  const calcTotalPrice = () => {
    let subPriceAfterVAT = subPrice + VatAmount;

    // Check if discount
    order.discount &&
      (order.discount.type === "percentage"
        ? (subPriceAfterVAT -= subPriceAfterVAT * (order.discount.value / 100))
        : order.discount.value < subPriceAfterVAT
        ? (subPriceAfterVAT -= order.discount.value)
        : (subPriceAfterVAT = 0));

    return subPriceAfterVAT.toFixed(2);
  };

  // Generate receipt pdf
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: restaurant.userId.businessName,
          styles: {
            halign: "left",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
        {
          content: "Receipt",
          styles: {
            halign: "right",
            fontSize: 20,
            textColor: "#ffffff",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fillColor: "#3366ff",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: `Table No#: ${
            order.tableNum
          } \nInvoice No#: ${order._id.substring(0, 8)}  \nVAT No#: ${
            restaurant.vatNum
          } \nDate: ${new Date(order.createdAt).toLocaleString()}`,
          styles: {
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content:
            `\n${restaurant.userId.businessAddress}` +
            `\n${restaurant.userId.state}` +
            `\n${restaurant.userId.zip} - ${restaurant.userId.city}`,
          styles: {
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    head: [["Items", "Quantity", "Price", "Amount"]],
    body: tableRows,
    theme: "striped",
    headStyles: {
      fillColor: "#3366ff",
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Subtotal:",
          styles: {
            halign: "right",
          },
        },
        {
          content: `${getSymbol(restaurant.currency)}${subPrice.toFixed(2)}`,
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: `VAT (${restaurant.vatPercentage}%):`,
          styles: {
            halign: "right",
          },
        },
        {
          content: `${getSymbol(restaurant.currency)}${VatAmount.toFixed(2)}`,
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: `Discount${
            order.discount ? " (" + order.discount.name + ")" : ""
          }:`,
          styles: {
            halign: "right",
          },
        },
        {
          content: `${
            order.discount
              ? order.discount?.type === "amount"
                ? "-" +
                  getSymbol(restaurant.currency) +
                  order.discount?.value.toFixed(2)
                : "-" + order.discount?.value + "%"
              : 0
          }`,
          styles: {
            halign: "right",
            textColor: "#ef0046",
          },
        },
      ],
      [
        {
          content: "Total amount:",
          styles: {
            halign: "right",
            textColor: "#3366ff",
            fontStyle: "bold",
          },
        },
        {
          content: `${getSymbol(restaurant.currency)}${calcTotalPrice()}`,
          styles: {
            halign: "right",
            textColor: "#3366ff",
            fontStyle: "bold",
          },
        },
      ],
    ],
    theme: "plain",
    styles: {
      fontSize: 12,
    },
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Notes",
          styles: {
            halign: "left",
            fontSize: 14,
          },
        },
      ],
      [
        {
          content:
            `- Payment done with ${order.paymentMethod}.` +
            `\n- Tips is not included in receipt.`,

          styles: {
            halign: "left",
            cellPadding: 1,
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Powered by Wyld",
          styles: {
            halign: "center",
            textColor: "#808080",
          },
        },
      ],
    ],
    theme: "plain",
  });

  return doc.save(
    `${restaurant.userId.businessName}-invoice-${order._id.substring(0, 8)}`
  );
};
