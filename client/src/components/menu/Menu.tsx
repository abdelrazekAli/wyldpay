import "../../styles/menu/menu.sass";
import { MainItems } from "./MainItems";
import { MainHeader } from "./MainHeader";
import { mainProducts } from "../../dummyData";
import { MainCategories } from "./MainCategories";

export const Menu = () => {
  // Will be fetched from API by restaurantId
  const categories = [
    { value: "popular", selected: true },
    { value: "pizzas", selected: true },
    { value: "burgers", selected: true },
    { value: "meats", selected: true },
    { value: "chickens", selected: true },
    { value: "lunch", selected: true },
    { value: "drinks", selected: true },
  ];
  return (
    <>
      <MainHeader />
      <MainCategories categories={categories} />
      <MainItems items={mainProducts} categories={categories} />
    </>
  );
};
