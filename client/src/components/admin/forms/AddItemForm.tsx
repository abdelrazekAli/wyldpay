import axios from "axios";
import { useState } from "react";
import { ItemType } from "../../../types/Item";
import { CategoryType } from "../../../types/Category";

export const AddItemForm = ({
  hideForm,
  setItems,
  category,
  restaurantId,
}: {
  hideForm: () => void;
  setItems: (newItem: ItemType) => void;
  category: CategoryType;
  restaurantId: string;
}) => {
  const [name, setName] = useState<string | null>("");
  const [file, setFile] = useState<string | Blob>("");
  const [price, setPrice] = useState<number | null>(null);
  const [itemImg, setItemImg] = useState<null | File>(null);
  const [description, setDescription] = useState<string | null>("");
  const [ingredients, setIngredients] = useState<string | null>("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

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
        name,
        price,
        img: url,
        category: category?.value,
        desc: description,
        ingredients,
        restId: restaurantId,
      });

      setItems(res.data);

      hideForm();
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  return (
    <div id="myModal" className="modal form-modal">
      <div className="modal-content p-relative custom-content">
        <span onClick={hideForm} className="modal-close">
          &times;
        </span>
        <div className="main-content">
          <h2>Add item</h2>
          <form onSubmit={handleAddItem}>
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
              placeholder="Item description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <textarea
              id=""
              cols={30}
              rows={3}
              placeholder="Item ingredients"
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
            <button
              disabled={
                !name ||
                !price ||
                !description ||
                !ingredients ||
                !itemImg ||
                isLoading
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
  );
};
