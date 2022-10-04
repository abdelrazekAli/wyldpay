import { useState } from "react";
import { Link } from "react-scroll";
import "../../../styles/menu/categories.sass";
import { CategoryType } from "../../../types/Category";

export const MainCategories = ({
  categories,
}: {
  categories: CategoryType[];
}) => {
  const [fixed, setFixed] = useState<boolean>(false);

  const onScroll = () => {
    window.scrollY >= 300 ? setFixed(true) : setFixed(false);
  };
  window.addEventListener("scroll", onScroll);

  return (
    <>
      <div
        className={
          fixed ? "menu-categories menu-categories-fixed" : "menu-categories"
        }
      >
        {categories.map((c, i) => (
          <Link
            to={`${c.value}`}
            spy={true}
            offset={-75}
            className="category-item"
            activeClass="active"
            key={i}
          >
            {c.value}
          </Link>
        ))}
      </div>
    </>
  );
};
