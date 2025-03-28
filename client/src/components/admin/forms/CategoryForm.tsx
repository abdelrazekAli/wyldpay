import api from "../../../utils/API";
import { useRef, useState } from "react";
import "../../../styles/forms/categoryForm.sass";
import { getUser } from "../../../redux/user.slice";
import { CategoryBox } from "../layouts/CategoryBox";
import { categories } from "../../../data/foodCategories";
import { StepperProps } from "../../../types/StepperProps";
import { useAppSelector } from "../../../redux/store.hooks";

export const CategoryForm = ({ onClick, onSkip }: StepperProps) => {
  const categoriesDestruct = [
    ...categories.map((value) => {
      return { value, selected: false };
    }),
  ];

  const categoryName = useRef<HTMLInputElement>(null!);
  const { accessToken, restaurantId } = useAppSelector(getUser);
  const [categoriesList, setCategoriesList] = useState(categoriesDestruct);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const filterCategories = categoriesList.filter((c) => c.selected === true);

  const toggleSelect = (value: string) => {
    const seletedCategories = categoriesList.map((c) =>
      c.value === value ? { ...c, selected: !c.selected } : c
    );

    setCategoriesList(seletedCategories);
  };

  const addCategory = (e: React.FormEvent<HTMLFormElement>) => {
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
    setIsLoading(true);
    localStorage.setItem("categories", JSON.stringify(filterCategories));
    try {
      await api.put(
        `/restaurants/categories`,
        {
          categories: filterCategories,
          restaurantId,
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      onClick();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError("Something went wrong!");
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
            <span className="color-error text-center fs-2 my-1">{error}</span>
          </div>
          <div className="btn-container d-flex m-4">
            <div className="skip-btn" onClick={onSkip}>
              Skip for now
            </div>
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
