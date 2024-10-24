import api from "../../../utils/API";
import { Item } from "../../../types/Item";
import { AddItemForm } from "./AddItemForm";
import { ItemBox } from "../layouts/ItemBox";
import "../../../styles/forms/foodsForm.sass";
import { Key, useEffect, useState } from "react";
import { getUser } from "../../../redux/user.slice";
import { StepperProps } from "../../../types/StepperProps";
import { MainCategoryType } from "../../../types/Category";
import { useAppSelector } from "../../../redux/store.hooks";

export const ItemsForm = ({ onClick }: StepperProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const { restaurantId, accessToken } = useAppSelector(getUser);
  const categories = JSON.parse(localStorage.getItem("categories")!);
  const [categorySelected, setCategorySelected] =
    useState<MainCategoryType | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get(`/items/restaurant/${restaurantId}`);
        setItems(res.data);
      } catch (err) {
        console.log(err);
        setError("Something went wrong!");
      }
    };
    fetchItems();
  }, [restaurantId]);

  // Handle delete item
  const handleDelete = async (itemId: string) => {
    const filterItems = items.filter((i) => i._id !== itemId);
    setItems(filterItems);
    try {
      await api.delete(`/items/id/${itemId}`, {
        headers: {
          "auth-token": accessToken,
        },
      });
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    }
  };

  // Handle update item
  const handleUpdateItem = async (updatedItem: Item) => {
    const updatedItems = items.map((item) => {
      if (item._id === updatedItem._id) {
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <>
      {isFormVisible && (
        <AddItemForm
          category={categorySelected!}
          restaurantId={restaurantId}
          hideForm={() => setFormVisible(false)}
          setItems={(newItem) => setItems([...items, newItem])}
        />
      )}
      <div className="foods-form">
        <div className="container">
          <h3>Time to create your food options!</h3>
          <p>First select category and then add your food items.</p>
          {error && (
            <span className="error color-error d-block mt-4 text-center fs-3">
              {error}
            </span>
          )}
          <div className="main-content">
            <h4>Categories</h4>
            <button
              disabled={!categorySelected}
              className="btn"
              onClick={() => {
                setFormVisible(!isFormVisible);
              }}
            >
              + Add item
            </button>
          </div>
          <div className="category">
            {categories?.map((cate: MainCategoryType, i: Key) => (
              <div
                className={
                  categorySelected?.value === cate.value
                    ? "box selected"
                    : "box"
                }
                onClick={() => setCategorySelected(cate)}
                key={i}
              >
                <h5>{cate.value}</h5>
              </div>
            ))}
          </div>
          <div className="items-container">
            {items.length === 0 ? (
              <div className="no-items">No items added yet</div>
            ) : (
              items.map(
                (i) =>
                  categorySelected?.value === i.category && (
                    <ItemBox
                      item={i}
                      key={i._id}
                      onDelete={(id) => handleDelete(id)}
                      onUpdate={(updatedItem) => handleUpdateItem(updatedItem)}
                    />
                  )
              )
            )}
          </div>
          <div className="btn-container d-flex m-4">
            <div className="skip-btn" onClick={onClick}>
              Skip for now
            </div>
            <button
              className="btn"
              onClick={onClick}
              disabled={items.length === 0}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
