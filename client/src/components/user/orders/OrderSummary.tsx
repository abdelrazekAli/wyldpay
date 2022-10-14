export const OrderSummary = ({
  currency,
  subPrice,
}: {
  currency: string;
  subPrice: number;
}) => {
  return (
    <div className="order-summary">
      <div className="order-item-icon-wrapper">
        <img src="../../../assets/images/summary.svg" alt="" />
      </div>
      <div className="order-item-texts">
        <h2 className="capitalize">Summary</h2>
      </div>
      <div className="counters-price-wrapper">
        <span>
          {currency}
          {subPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
