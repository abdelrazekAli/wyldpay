import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import "../../../styles/menu/categories.sass";
import { MenuCategoryType } from "../../../types/Category";

export const MainCategories = ({
  categories,
}: {
  categories: MenuCategoryType[];
}) => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, [window.scrollY]);
  return (
    <>
      <div className={"menu-categories menu-categories-fixed"}>
        {categories.map((c, i) => (
          <Link
            to={`${c.value}`}
            spy={true}
            offset={-100}
            className={
              i === 0 && scroll <= 100
                ? "active category-item"
                : "category-item"
            }
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
