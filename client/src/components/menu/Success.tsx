import "../../styles/menu/orderSuccess.sass";

export const Success = () => {
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
      <div className="invoice-btn-wrapper">
        <div className="invoice-btn">Download Invoice</div>
      </div>
    </div>
  );
};
