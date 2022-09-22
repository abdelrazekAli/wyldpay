import axios from "axios";
import { Item } from "../Item";
import "../../../styles/forms/itemsForm.sass";
import { ItemType } from "../../../types/Item";
import { Key, useEffect, useState } from "react";
import { getUser } from "../../../redux/user.slice";
import { CategoryType } from "../../../types/Category";
import { useAppSelector } from "../../../redux/store.hooks";

export const MenuForm = () => {
  const { restaurantId } = useAppSelector(getUser);
  const [file, setFile] = useState<string | Blob>("");
  const [price, setPrice] = useState<number | null>(null);
  const [itemImg, setItemImg] = useState<null | File>(null);
  const [itemname, setItemName] = useState<string | null>("");
  const [select, setSelect] = useState<CategoryType | null>(null);
  const [description, setDescription] = useState<string | null>("");
  const [categoryName, setCategoryName] = useState<string | null>("");
  const [categories, setCategories] = useState<CategoryType[] | null>();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isItemFormVisible, setItemFormVisible] = useState<boolean>(false);
  const [isCategoryFormVisible, setCategoryFormVisible] =
    useState<boolean>(false);

  const [items, setItems] = useState<ItemType[]>([]);

  useEffect(() => {
    // Fetch items
    const fetchItems = async () => {
      const res = await axios.get(`/api/v1/items/restaurant/${restaurantId}`);
      setItems(res.data);
    };

    // Fetch categories
    const fetchCategories = async () => {
      const res = await axios.get(
        `/api/v1/restaurants/categories/${restaurantId}`
      );
      setCategories(res.data);
      console.log(res.data);
    };

    fetchItems();
    fetchCategories();
  }, [restaurantId]);

  // Handle add item
  const handleAddItem = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);

    let data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        process.env.REACT_APP_CLOUDINARY_LINK!,
        data
      );
      const { url } = uploadRes.data;

      const res = await axios.post("/api/v1/items", {
        name: itemname,
        price,
        img: url,
        category: select?.value,
        desc: description,
        restId: restaurantId,
      });

      setItems([...items, res.data]);

      setItemFormVisible(!isItemFormVisible);
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  // Handle delete item
  const handleDeleteItem = async (itemId: string) => {
    const filterItems = items.filter((i) => i._id !== itemId);
    setItems(filterItems);
    try {
      await axios.delete(`/api/v1/items/id/${itemId}`);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  // Handle add category
  const handleAddCategory = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);

    const newCategories: CategoryType[] = [
      ...categories!,
      { value: categoryName!, selected: true },
    ];

    try {
      await axios.put("/api/v1/restaurants/categories", {
        categories: newCategories,
        restaurantId,
      });
      setisLoading(false);
      setCategories(newCategories);
      setCategoryFormVisible(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  return (
    <>
      {isItemFormVisible && (
        <div id="myModal" className="modal form-modal">
          <div className="modal-content p-relative custom-content">
            <span
              onClick={() => setItemFormVisible(!isItemFormVisible)}
              className="modal-close"
            >
              &times;
            </span>
            <div className="main-content">
              <h2>Add item</h2>
              <form onSubmit={handleAddItem}>
                <input
                  type="text"
                  placeholder="Item name"
                  onChange={(e) => setItemName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Item price"
                  onChange={(e) => setPrice(+e.target.value)}
                />
                <label htmlFor="item-img" className="img-label">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="item-img"
                    name="image"
                    onChange={(e) => {
                      setItemImg(e.target.files![0]);
                      setFile(e.target.files![0]);
                    }}
                  />
                  <span>Upload image</span>
                  <i className="fas fa-upload" color="red"></i>
                </label>
                {itemImg && (
                  <div className="box">
                    <img
                      src={URL.createObjectURL(itemImg)}
                      alt="img"
                      className="img-obj"
                    />
                  </div>
                )}
                <textarea
                  id=""
                  cols={30}
                  rows={3}
                  placeholder="Item decription"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button
                  disabled={
                    !itemname || !price || !description || !itemImg || isLoading
                  }
                  type="submit"
                  className="btn"
                >
                  {isLoading ? "Loading..." : "Add"}
                </button>
              </form>
            </div>
            {error && (
              <span className="color-error text-center fs-2 my-1">{error}</span>
            )}
          </div>
        </div>
      )}
      {isCategoryFormVisible && (
        <div id="myModal" className="modal form-modal">
          <div className="modal-content p-relative custom-content">
            <span
              onClick={() => setCategoryFormVisible(!isCategoryFormVisible)}
              className="modal-close"
            >
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
          </div>
        </div>
      )}
      <div className="menu-form ">
        <div className="container">
          <h3>Menu</h3>
          <p>Select category and then add your food items.</p>
          <div className="main-content">
            <h4>Categories</h4>
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
                disabled={!select}
                className="btn"
                onClick={() => {
                  setItemFormVisible(!isCategoryFormVisible);
                  setItemImg(null);
                }}
              >
                + Add item
              </button>
            </div>
          </div>
          <div className="category">
            {categories?.map((cate: CategoryType, i: Key) => (
              <div
                className={
                  select?.value === cate.value ? "box selected" : "box"
                }
                onClick={() => setSelect(cate)}
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
                  select?.value === i.category && (
                    <Item
                      item={i}
                      key={i._id}
                      onDelete={(id) => handleDeleteItem(id)}
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
