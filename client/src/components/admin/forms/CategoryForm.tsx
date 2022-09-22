import axios from "axios";
import { useRef, useState } from "react";
import { CategoryBox } from ".././CategoryBox";
import "../../../styles/forms/categoryForm.sass";
import { StepperProps } from "../../../types/StepperProps";

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

  const categoryName = useRef<HTMLInputElement>(null!);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [categoriesList, setCategoriesList] = useState(categoriesDestruct);

  const filterCategories = categoriesList.filter((c) => c.selected === true);

  const toggleSelect = (value: string) => {
    const seletedCategories = categoriesList.map((c) =>
      c.value === value ? { ...c, selected: !c.selected } : c
    );

    setCategoriesList(seletedCategories);
  };

  const addCategory = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setFormVisible(!isFormVisible);
    setCategoriesList([
      ...categoriesList,
      {
        value: categoryName.current.value,
        selected: true,
      },
    ]);
  };

  const handleSubmit = async () => {
    setError(null);
    setisLoading(true);
    const restaurantId = localStorage.getItem("restaurantId");
    localStorage.setItem("categories", JSON.stringify(filterCategories));
    try {
      await axios.put("/api/v1/restaurants/categories", {
        categories: filterCategories,
        restaurantId,
      });
      onClick();
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  return (
    <>
      {isFormVisible && (
        <div id="myModal" className="modal form-modal">
          <div className="modal-content p-relative custom-content">
            <span
              onClick={() => setFormVisible(!isFormVisible)}
              className="modal-close"
            >
              &times;
            </span>
            <div className="main-content">
              <h2>Add category</h2>
              <form onSubmit={addCategory}>
                <input
                  type="text"
                  placeholder="Category name"
                  ref={categoryName}
                  className="mb-1"
                />
                <button disabled={!categoryName} type="submit" className="btn">
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="category-form">
        <div className="container">
          <h3>Let's make a menu!</h3>
          <p>
            Now we have your restaurant, let's give you something to <br />{" "}
            serve, start by adding or choosing your menu categories.
          </p>
          <div className="main-content d-flex  mt-1">
            <h4>Categories</h4>
            <button
              className="btn"
              onClick={() => {
                setFormVisible(!isFormVisible);
              }}
            >
              + Add item
            </button>
          </div>
          <section className="category">
            {categoriesList.map((cate, i) => (
              <CategoryBox
                cate={cate}
                onClick={() => toggleSelect(cate.value)}
                key={i}
              />
            ))}
          </section>
          <div>
            {error && (
              <span className="color-error text-center fs-2 my-1">{error}</span>
            )}
          </div>
          <div className="btn-container">
            <button
              className="btn"
              disabled={filterCategories.length === 0 || isLoading}
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};