import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../styles/menu/orderSuccess.sass";
export const Success = () => {
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
            content: `Table#: 5 \nDate: ${new Date().toLocaleDateString()} \nReference: INV0001 `,
            styles: {
              halign: "left",
            },
          },
        ],
      ],
      theme: "plain",
    });

    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content:
    //           "Billed to:" +
    //           "\nJohn Doe" +
    //           "\nBilling Address line 1" +
    //           "\nBilling Address line 2" +
    //           "\nZip code - City" +
    //           "\nCountry",
    //         styles: {
    //           halign: "left",
    //         },
    //       },
    //       {
    //         content:
    //           "Shipping address:" +
    //           "\nJohn Doe" +
    //           "\nShipping Address line 1" +
    //           "\nShipping Address line 2" +
    //           "\nZip code - City" +
    //           "\nCountry",
    //         styles: {
    //           halign: "left",
    //         },
    //       },
    //       {
    //         content:
    //           "From:" +
    //           "\nCompany name" +
    //           "\nShipping Address line 1" +
    //           "\nShipping Address line 2" +
    //           "\nZip code - City" +
    //           "\nCountry",
    //         styles: {
    //           halign: "right",
    //         },
    //       },
    //     ],
    //   ],
    //   theme: "plain",
    // });

    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: "Amount due:",
    //         styles: {
    //           halign: "right",
    //           fontSize: 14,
    //         },
    //       },
    //     ],
    //     [
    //       {
    //         content: "€4000",
    //         styles: {
    //           halign: "right",
    //           fontSize: 20,
    //           textColor: "#3366ff",
    //         },
    //       },
    //     ],
    //   ],
    //   theme: "plain",
    // });

    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content: "Products & Services",
    //         styles: {
    //           halign: "left",
    //           fontSize: 14,
    //         },
    //       },
    //     ],
    //   ],
    //   theme: "plain",
    // });

    autoTable(doc, {
      head: [["Items", "Quantity", "Price", "Amount"]],
      body: [
        ["Margherita Pizza", "1", "€50", "€50"],
        ["Cheese Burger", "3", "€25", "€75"],
        ["Fried Chicken", "2", "€30", "€60"],
        ["Orange Juice", "2", "€10", "€20"],
      ],
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
        <img src="../../../../assets/images/payment-success.png" alt="" />
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
