export const getSymbol = (currency: string) => {
  switch (currency) {
    case "eur":
      return "€";

    case "gbp" || "egp":
      return "£";

    case "aed":
      return "AED";

    case "inr":
      return "₹";

    case "uah":
      return "₴";

    default:
      return "$";
  }
};
