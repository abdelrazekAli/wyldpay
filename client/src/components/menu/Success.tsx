import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles/menu/orderSuccess.sass";
import { getCartProducts } from "../../redux/cart.slice";
import { useAppSelector } from "../../redux/store.hooks";

export const Success = () => {
  let tableRows: any = [];
  const cartProducts = useAppSelector(getCartProducts);

  cartProducts.forEach((p) =>
    tableRows?.push([p.name, p.quantity, p.price, p.quantity * p.price])
  );

  console.log(tableRows);
  const downloadInvoice = () => {
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
            content: `Table No#: 5 \nDate: ${new Date().toLocaleDateString()} \nInvoice No#: INV0001  \nVAT No#: 14/2111/00417`,
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
            content: "€205",
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
            content: "€20.5",
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
            content: "€225.5",
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

  return (
    <div className="order-success">
      <div className="success-icon">
        <img src="../../../../assets/images/payment-success-sm.png" alt="" />
      </div>
      <h1 className="heading-1">
        We've received your order <br /> and we'll prepare it right away
      </h1>
      <div className="google-rate">
        <div className="heading-2">Please rate us on Google</div>
        <div
          onClick={() =>
            window.open(
              "https://www.google.com/business",
              "Google review",
              "width=600,height=400"
            )
          }
          className="rate-wrapper"
        >
          <div className="text">
            <img src="../../../../assets/images/star.svg" alt="" />
            Evaluate
          </div>
          <div className="icon">
            <img src="../../../../assets/images/open-right.svg" alt="" />
          </div>
        </div>
      </div>
      <div className="social-links">
        <div className="heading-2">We're on social media</div>
        <div className="links">
          <a href={"https://instagram.com"} className="link">
            <img src="../../../../assets/images/insta.svg" alt="" />
          </a>
          <a href={"https://telegram.org"} className="link">
            <img src="../../../../assets/images/telegram.svg" alt="" />
          </a>
          <a href={"https://youtube.com"} className="link">
            <img src="../../../../assets/images/youtube.svg" alt="" />
          </a>
          <a href={"https://twitter.com"} className="link">
            <img src="../../../../assets/images/twitter.svg" alt="" />
          </a>
        </div>
      </div>
      <div className="invoice-btn-wrapper" onClick={downloadInvoice}>
        <div className="invoice-btn">Download Invoice</div>
      </div>
    </div>
  );
};
