import axios from "axios";
import { useState } from "react";
import { Item } from "../../../types/Item";
import { uploadImage } from "../../../utils/uploadImage";
import { MainCategoryType } from "../../../types/Category";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const AddItemForm = ({
  hideForm,
  setItems,
  category,
  restaurantId,
}: {
  hideForm: () => void;
  setItems: (newItem: Item) => void;
  category: MainCategoryType;
  restaurantId: string;
}) => {
  const [name, setName] = useState<string | null>("");
  const [image, setImage] = useState<string | Blob>("");
  const [price, setPrice] = useState<number | null>(null);
  const [itemImg, setItemImg] = useState<null | File>(null);
  const [description, setDescription] = useState<string | null>("");
  const [ingredients, setIngredients] = useState<string | null>("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const imageURL = await uploadImage(image);

      const res = await axios.post("/api/v1/items", {
        name,
        price,
        img: imageURL,
        category: category?.value,
        desc: description,
        ingredients,
        restId: restaurantId,
      });

      setItems(res.data);

      hideForm();
    } catch (err) {
      console.log(err);
      setError("Somthing went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  // Disable input number increment on wheel scroll
  const disableIncrement = () => {
    if (document.activeElement instanceof HTMLElement)
      document.activeElement.blur();
  };

  return (
    <div id="myModal" className="modal form-modal">
      <div className="modal-content p-relative custom-content custom-modal-p">
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
              step=".01"
              placeholder="Item price"
              onWheel={disableIncrement}
              onChange={(e) => setPrice(+e.target.value)}
            />
            <label htmlFor="item-img" className="img-label mb-0">
              <input
                type="file"
                accept="image/*"
                hidden
                id="item-img"
                name="image"
                onChange={(e) => {
                  setItemImg(e.target.files![0]);
                  setImage(e.target.files![0]);
                }}
              />
              <span>Upload image</span>
              <FontAwesomeIcon icon={faUpload} className="upload-icon" />
            </label>
            <span className="instructions">Recommended size is 100x100px</span>
            {itemImg && (
              <div className="img-box">
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
        <span className="color-error text-center fs-2 my-1">{error}</span>
      </div>
    </div>
  );
};
