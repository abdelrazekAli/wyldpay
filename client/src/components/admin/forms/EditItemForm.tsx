import axios from "axios";
import { useState } from "react";
import { Item } from "../../../types/Item";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const EditItemForm = ({
  item,
  hideForm,
  onUpdate,
}: {
  item: Item;
  hideForm: () => void;
  onUpdate: (updatedItem: Item) => void;
}) => {
  const [name, setName] = useState<string>(item.name);
  const [file, setFile] = useState<string | Blob>("");
  const [price, setPrice] = useState<number>(item.price);
  const [itemImg, setItemImg] = useState<null | File>(null);
  const [description, setDescription] = useState<string>(item.desc);
  const [ingredients, setIngredients] = useState<string>(item.ingredients);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const handleEditItem = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);
    let url;
    try {
      if (file) {
        let data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        const uploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_LINK!,
          data
        );
        url = uploadRes.data.url;
      }
      const updatedItem = {
        name,
        price,
        img: file ? url : item.img,
        category: item.category,
        desc: description,
        ingredients,
        restId: item.restId,
      };
      await axios.put(`/api/v1/items/id/${item._id}`, updatedItem);
      onUpdate({ _id: item._id, ...updatedItem });
      hideForm();
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
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
        <div className="main-edit-content">
          <h2>Edit item</h2>
          <form onSubmit={handleEditItem}>
            <input
              type="text"
              value={name}
              placeholder="Item name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              step=".01"
              value={price}
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
                  setFile(e.target.files![0]);
                }}
              />
              <span>Change image</span>
              <FontAwesomeIcon icon={faUpload} className="upload-icon" />
            </label>
            <span className="instructions">Recommended size is 100x100px</span>
            {itemImg ? (
              <div className="img-box">
                <img
                  src={URL.createObjectURL(itemImg)}
                  alt="img"
                  className="img-obj"
                />
              </div>
            ) : (
              <div className="img-box">
                <img src={item.img} alt="img" className="img-obj" />
              </div>
            )}
            <textarea
              id=""
              cols={30}
              rows={3}
              value={description}
              placeholder="Item description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <textarea
              id=""
              cols={30}
              rows={3}
              value={ingredients}
              placeholder="Item ingredients"
              onChange={(e) => setIngredients(e.target.value)}
            ></textarea>
            <button
              disabled={
                !name || !price || !description || !ingredients || isLoading
              }
              type="submit"
              className="btn"
            >
              {isLoading ? "Loading..." : "Apply"}
            </button>
          </form>
        </div>
        <span className="color-error text-center fs-2 my-1">{error}</span>
      </div>
    </div>
  );
};
