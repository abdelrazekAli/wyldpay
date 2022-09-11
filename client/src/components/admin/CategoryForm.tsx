import { useState } from "react";
import { CategoryBox } from "./CategoryBox";
import "../../styles/forms/categoryForm.sass";
import { StepperProps } from "../../types/StepperProps";

export const CategoryForm = ({ onClick }: StepperProps) => {
  const categories: string[] = [
    "appetizers",
    "pizzas",
    "burgers",
    "pastas",
    "creps",
    "meats",
    "chickens",
    "seafood",
    "soups",
    "salads",
    "breakfast",
    "lunch",
    "dinner",
    "cakes",
    "cookies",
    "sides",
    "drinks",
    "dessert",
    "super",
    "popular",
  ];

  const categoriesDestruct = [
    ...categories.map((value) => {
      return { value, selected: false };
    }),
  ];

  const [categoriesList, setCategoriesList] = useState(categoriesDestruct);

  const filterCategories = categoriesList.filter((c) => c.selected === true);

  const toggleSelect = (value: string) => {
    const seletedCategories = categoriesList.map((c) =>
      c.value === value ? { ...c, selected: !c.selected } : c
    );

    setCategoriesList(seletedCategories);
  };

  const handleSubmit = () => {
    onClick();
    localStorage.setItem("categories", JSON.stringify(filterCategories));
  };

  return (
    <div className="category-form">
      <div className="container">
        <h3>Let's make a menu!</h3>
        <p>
          Now we have your restaurant, let's give you something to <br /> serve,
          start by choosing your menu categories.
        </p>
        <h4>Categories</h4>
        <section className="category">
          {categoriesList.map((cate, i) => (
            <CategoryBox
              cate={cate}
              onClick={() => toggleSelect(cate.value)}
              key={i}
            />
          ))}
        </section>
        <div className="btn-container">
          <button
            className="btn"
            disabled={filterCategories.length === 0}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
