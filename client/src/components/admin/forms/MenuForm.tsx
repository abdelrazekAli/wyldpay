import axios from "axios";
import "../../../styles/item.sass";
import { Item } from "../../../types/Item";
import { AddItemForm } from "./AddItemForm";
import { ItemBox } from "../layouts/ItemBox";
import "../../../styles/forms/menuForm.sass";
import { Key, useEffect, useState } from "react";
import { AddCategoryForm } from "./AddCategoryForm";
import { getUser } from "../../../redux/user.slice";
import { MainCategoryType } from "../../../types/Category";
import { useAppSelector } from "../../../redux/store.hooks";

export const MenuForm = () => {
  const { restaurantId } = useAppSelector(getUser);

  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<MainCategoryType[] | null>();
  const [categorySelected, setCategorySelected] =
    useState<MainCategoryType | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isItemFormVisible, setItemFormVisible] = useState<boolean>(false);
  const [isCategoryFormVisible, setCategoryFormVisible] =
    useState<boolean>(false);

  useEffect(() => {
    // Fetch items
    const fetchItems = async () => {
      try {
        const res = await axios.get(`/api/v1/items/restaurant/${restaurantId}`);
        setItems(res.data);
      } catch (err) {
        console.log(err);
        setError("Something went wrong on fetch items!");
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `/api/v1/restaurants/categories/${restaurantId}`
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
        setError("Something went wrong on fetch categories!");
      }
    };

    fetchItems();
    fetchCategories();
  }, [restaurantId]);

  // Handle delete item
  const handleDeleteItem = async (itemId: string) => {
    const filterItems = items.filter((i) => i._id !== itemId);
    setItems(filterItems);
    try {
      await axios.delete(`/api/v1/items/id/${itemId}`);
    } catch (err) {
      console.log(err);
      setError("Somthing went wrong!");
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
      {isItemFormVisible && (
        <AddItemForm
          category={categorySelected!}
          restaurantId={restaurantId}
          hideForm={() => setItemFormVisible(false)}
          setItems={(newItem) => setItems([...items, newItem])}
        />
      )}
      {isCategoryFormVisible && (
        <AddCategoryForm
          categories={categories!}
          restaurantId={restaurantId}
          hideForm={() => setCategoryFormVisible(false)}
          setCategories={(newCategories) => setCategories(newCategories)}
        />
      )}
      <div className="menu-form w-100">
        <div className="container">
          <h3>Menu</h3>
          <p>Select category and then add your food items.</p>
          {error && (
            <span className="error color-error d-block mt-4 text-center fs-3">
              {error}
            </span>
          )}
          <div className="main-content">
            <h4 className="d-none-mobile">Categories</h4>
            <div className="btns-flex">
              <button
                className="btn mr-2"
                onClick={() => {
                  setCategoryFormVisible(!isItemFormVisible);
                }}
              >
                + Add category
              </button>
              <button
                disabled={!categorySelected}
                className="btn"
                onClick={() => {
                  setItemFormVisible(!isCategoryFormVisible);
                }}
              >
                + Add item
              </button>
            </div>
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
                      onDelete={(id) => handleDeleteItem(id)}
                      onUpdate={(updatedItem) => handleUpdateItem(updatedItem)}
                    />
                  )
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};
