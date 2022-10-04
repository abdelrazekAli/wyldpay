import { MainItem } from "./MainItem";
import { Element } from "react-scroll";
import "../../../styles/menu/items.sass";
import { ProductType } from "../../../types/Product";
import { CategoryType } from "../../../types/Category";

export const MainItems = ({
  categories,
  items,
}: {
  categories: CategoryType[];
  items: ProductType[];
}) => {
  return (
    <div className="menu-items">
      {categories.map((category, i) => (
        <Element key={i} name={category.value}>
          <div>
            <h1 className="heading-1 capitalize">{category.value}</h1>
            {items
              .filter((item) => item.category === category.value)
              .map((p) => (
                <MainItem product={p} key={p._id} />
              ))}
          </div>
        </Element>
      ))}
    </div>
  );
};
