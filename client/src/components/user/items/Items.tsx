import { Item } from "./Item";
import { Element } from "react-scroll";
import "../../../styles/menu/items.sass";
import { ProductType } from "../../../types/Product";
import { MenuCategoryType } from "../../../types/Category";

export const Items = ({
  categories,
  items,
}: {
  categories: MenuCategoryType[];
  items: ProductType[];
}) => {
  // Filter items array with category
  const filterItems = (category: MenuCategoryType) =>
    items
      .filter((item) => item.category === category.value)
      .map((p) => <Item product={p} key={p._id} />);

  return (
    <div className="menu-items">
      {categories.map((category, i) => (
        <Element key={i} name={category.value}>
          <h1 className="heading-1 capitalize">
            {/* {filterItems(category).length > 0 && category.value} */}
            {category.value}
          </h1>
          {filterItems(category)}
        </Element>
      ))}
    </div>
  );
};
