import axios from "axios";
import { ItemBox } from "../layouts/ItemBox";
import "../../../styles/forms/foodsForm.sass";
import { ItemType } from "../../../types/Item";
import { Key, useEffect, useState } from "react";
import { CategoryType } from "../../../types/Category";
import { StepperProps } from "../../../types/StepperProps";

export const ItemsForm = ({ onClick }: StepperProps) => {
  const [name, setName] = useState<string | null>("");
  const [file, setFile] = useState<string | Blob>("");
  const [price, setPrice] = useState<number | null>(null);
  const [itemImg, setItemImg] = useState<null | File>(null);
  const [select, setSelect] = useState<CategoryType | null>(null);
  const [description, setDescription] = useState<string | null>("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const restaurantId = localStorage.getItem("restaurantId");
  const categories = JSON.parse(localStorage.getItem("categories")!);

  const [items, setItems] = useState<ItemType[]>([]);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      const res = await axios.get(`/api/v1/items/restaurant/${restaurantId}`);
      setItems(res.data);
    };
    fetchItems();
  }, [restaurantId]);

  // Handle add item
  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
        name,
        price,
        img: url,
        category: select?.value,
        desc: description,
        restId: restaurantId,
      });

      setItems([...items, res.data]);

      setFormVisible(!isFormVisible);
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  // Handle delete item
  const handleDelete = async (itemId: string) => {
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
              <h2>Add item</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Item name"
                  onChange={(e) => setName(e.target.value)}
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
                    !name || !price || !description || !itemImg || isLoading
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
      <div className="foods-form">
        <div className="container">
          <h3>Time to create your food options!</h3>
          <p>First select category and then add your food items.</p>
          <div className="main-content">
            <h4>Categories</h4>
            <button
              disabled={!select}
              className="btn"
              onClick={() => {
                setFormVisible(!isFormVisible);
                setItemImg(null);
              }}
            >
              + Add item
            </button>
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
                    <ItemBox
                      item={i}
                      key={i._id}
                      onDelete={(id) => handleDelete(id)}
                    />
                  )
              )
            )}
          </div>
          <div className="btn-container">
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
