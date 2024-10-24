import { useState } from "react";
import api from "../../../utils/API";
import { getUser } from "../../../redux/user.slice";
import { MainCategoryType } from "../../../types/Category";
import { useAppSelector } from "../../../redux/store.hooks";

export const AddCategoryForm = ({
  hideForm,
  categories,
  setCategories,
  restaurantId,
}: {
  hideForm: () => void;
  categories: MainCategoryType[];
  setCategories: (newCategories: MainCategoryType[]) => void;
  restaurantId: string;
}) => {
  const { accessToken } = useAppSelector(getUser);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string | null>("");

  // Handle add category
  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const newCategories: MainCategoryType[] = [
      ...categories,
      { value: categoryName!, selected: true },
    ];

    try {
      await api.put(
        `/restaurants/categories`,
        {
          categories: newCategories,
          restaurantId,
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      setCategories(newCategories);
      hideForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong on fetch categories!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="myModal" className="modal form-modal">
      <div className="modal-content p-relative custom-content custom-modal-p">
        <span onClick={hideForm} className="modal-close">
          &times;
        </span>
        <div className="main-content">
          <h2>Add category</h2>
          <form onSubmit={(e) => handleAddCategory(e)}>
            <input
              type="text"
              placeholder="Category name"
              className="mb-1"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <button
              disabled={!categoryName || isLoading}
              type="submit"
              className="btn"
            >
              {isLoading ? "Loading..." : "Add"}
            </button>
          </form>
        </div>
        <span className="color-error text-center fs-2 my-1">{error}</span>
      </div>
    </div>
  );
};
