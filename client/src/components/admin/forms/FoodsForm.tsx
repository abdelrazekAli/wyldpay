import { Item } from ".././Item";
import "../../../styles/forms/foodsForm.sass";
import { Key, useRef, useState } from "react";
import { CategoryType } from "../../../types/Category";
import { StepperProps } from "../../../types/StepperProps";

export const FoodsForm = ({ onClick }: StepperProps) => {
  const name = useRef<HTMLInputElement>(null!);
  const price = useRef<HTMLInputElement>(null!);
  const description = useRef<HTMLTextAreaElement>(null!);

  const [itemImg, setItemImg] = useState<null | File>(null);
  const [select, setSelect] = useState<CategoryType | null>(null);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);

  const categories = JSON.parse(localStorage.getItem("categories")!);

  const [items, setItems] = useState<
    { id: number; name: string; price: number; category: string; img: File }[]
  >([]);

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newItem = {
      id: getRandomIntInclusive(100, 1000),
      img: itemImg!,
      name: name.current.value,
      price: +price.current.value,
      category: select?.value!,
    };
    setItems((arr) => [...arr, newItem]);
    setFormVisible(!isFormVisible);
  };

  const handleDelete = (id: number) => {
    const filterItems = items.filter((i) => i.id !== id);
    setItems(filterItems);
  };

  const handleContinue = () => {};

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
                <input type="text" placeholder="Item name" ref={name} />
                <input type="number" placeholder="Item price" ref={price} />

                <label htmlFor="item-img" className="img-label">
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id="item-img"
                    name="image"
                    onChange={(e) => setItemImg(e.target.files![0])}
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
                  ref={description}
                  id=""
                  cols={30}
                  rows={3}
                  placeholder="Item decription"
                ></textarea>
                <button
                  disabled={!itemImg}
                  type="submit"
                  className="btn"
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </form>
            </div>
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
              <div className="no-items">No items yet added</div>
            ) : (
              items.map(
                (i) =>
                  select?.value === i.category && (
                    <Item
                      product={i}
                      key={i.id}
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
