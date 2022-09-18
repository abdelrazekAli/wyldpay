import axios from "axios";
import { useState } from "react";
import "../../styles/forms/restaurantForm.sass";
import { StepperProps } from "../../types/StepperProps";

export const RestForm = ({ onClick }: StepperProps) => {
  const [name, setName] = useState<string | null>("");
  const [file, setFile] = useState<string | Blob>("");
  const [logo, setLogo] = useState<null | File>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string | null>("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
      const userId = localStorage.getItem("userId");

      const restaurant = await axios.post("/api/v1/restaurant", {
        name,
        currency,
        logo: url,
        userId,
      });

      localStorage.setItem("restaurantId", restaurant.data._id);

      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
    onClick();
  };

  return (
    <div className="rest-form">
      <div className="container">
        <h3>Now let's set up your restaurant!</h3>
        <p>
          Enter your the best things about your <br /> business.
        </p>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Type of food" />
            <input
              type="text"
              placeholder="Restaurant name"
              onChange={(e) => setName(e.target.value)}
            />
            <select
              name="cars"
              id="categories"
              className="custom-select select-minimal"
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Preferred currency
              </option>
              <option value="eur">EUR</option>
              <option value="usd">USD</option>
              <option value="gbp">GBP</option>
              <option value="aed">AED</option>
              <option value="uah">UAH</option>
              <option value="egp">EGP</option>
              <option value="cad">CAD</option>
              <option value="inr">INR</option>
            </select>
            <textarea
              name=""
              id=""
              cols={30}
              rows={4}
              placeholder="Write a short bio about your restaurant !"
            ></textarea>
            <label htmlFor="logo" className="img-label">
              <input
                type="file"
                accept="image/*"
                hidden
                id="logo"
                onChange={(e) => {
                  setLogo(e.target.files![0]);
                  setFile(e.target.files![0]);
                }}
              />
              <span>Upload logo</span>
              <i className="fas fa-upload" color="red"></i>
            </label>
            {logo && (
              <div className="box">
                <img
                  src={URL.createObjectURL(logo)}
                  alt="img"
                  className="img-obj"
                />
              </div>
            )}

            <button
              type="submit"
              className="btn"
              disabled={!logo || !name || !currency || isLoading}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
            {error && (
              <span className="color-error text-center fs-2 my-1">{error}</span>
            )}
          </form>
          <div className="imgs home-right">
            <img
              src=".././assets/images/food1.png"
              alt="food"
              className="food-img food-1"
              width="200"
              loading="lazy"
            />
            <img
              src=".././assets/images/food2.png"
              alt="food"
              className="food-img food-2"
              width="200"
              loading="lazy"
            />
            <img
              src=".././assets/images/food3.png"
              alt="food"
              className="food-img food-3"
              width="200"
              loading="lazy"
            />

            <img
              src=".././assets/images/circle.svg"
              alt="circle shape"
              className="shape shape-1"
              width="25"
            />
            <img
              src=".././assets/images/circle.svg"
              alt="circle shape"
              className="shape shape-2"
              width="15"
            />
            <img
              src=".././assets/images/circle.svg"
              alt="circle shape"
              className="shape shape-3"
              width="30"
            />
            <img
              src=".././assets/images/ring.svg"
              alt="ring shape"
              className="shape shape-4"
              width="60"
            />
            <img
              src=".././assets/images/ring.svg"
              alt="ring shape"
              className="shape shape-5"
              width="40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
