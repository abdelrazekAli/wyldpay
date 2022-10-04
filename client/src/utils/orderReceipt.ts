import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ProductType } from "../types/Product";

export const downloadReceipt = (
  cartProducts: ProductType[],
  subPrice: number
) => {
  let tableRows: any = [];

  cartProducts.forEach((p) =>
    tableRows?.push([p.name, p.quantity!, p.price, p.quantity! * p.price])
  );

  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: "Restaurant name",
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
          content: `Table No#: 5 \nInvoice No#: INV0001  \nVAT No#: 14/2111/00417 \nDate: ${new Date().toLocaleString()}`,
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
            "\nAddress line 1" +
            "\nAddress line 2" +
            "\nZip code - City" +
            "\nState",
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
          content: `€${subPrice}`,
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total tax:",
          styles: {
            halign: "right",
          },
        },
        {
          content: `0`,
          styles: {
            halign: "right",
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
          content: `€${subPrice}`,
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

  return doc.save("invoice");
};
