import axios from "axios";
import { useState } from "react";
import "../../../styles/forms/restaurantForm.sass";
import { StepperProps } from "../../../types/StepperProps";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const RestForm = ({ onClick }: StepperProps) => {
  const userId = localStorage.getItem("userId");
  const [logo, setLogo] = useState<null | File>(null);
  const [vatNum, setVatNum] = useState<string | null>("");
  const [logoBlob, setLogoBlob] = useState<string | Blob>("");
  const [currency, setCurrency] = useState<string | null>("");
  const [background, setBackground] = useState<null | File>(null);
  const [backgroundBlob, setBackgroundBlob] = useState<string | Blob>("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Handle form submit
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);

    let logoForm = new FormData();
    logoForm.append("file", logoBlob);
    logoForm.append("upload_preset", "uploads");

    let backgroundForm = new FormData();
    backgroundForm.append("file", backgroundBlob);
    backgroundForm.append("upload_preset", "uploads");

    try {
      const uploadLogoRes = await axios.post(
        process.env.REACT_APP_CLOUDINARY_LINK!,
        logoForm
      );
      const { url: logoURL } = uploadLogoRes.data;

      const uploadBackgroundRes = await axios.post(
        process.env.REACT_APP_CLOUDINARY_LINK!,
        backgroundForm
      );
      const { url: backgroundURL } = uploadBackgroundRes.data;

      const restaurant = await axios.post("/api/v1/restaurants", {
        vatNum,
        currency,
        logo: logoURL,
        background: backgroundURL,
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
            <input
              type="text"
              placeholder="VAT number"
              onChange={(e) => setVatNum(e.target.value)}
            />
            <select
              name="currencies"
              id="currencies"
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
            <label htmlFor="logo" className="img-label">
              <input
                type="file"
                accept="image/*"
                hidden
                id="logo"
                onChange={(e) => {
                  setLogo(e.target.files![0]);
                  setLogoBlob(e.target.files![0]);
                }}
              />
              <span>Upload logo</span>

              <FontAwesomeIcon icon={faUpload} className="upload-icon" />
            </label>
            <span className="instructions">
              Logo should be in circle shape with dimensions 75*75
            </span>
            {logo && (
              <div className="box mb-1">
                <img
                  src={URL.createObjectURL(logo)}
                  alt="img"
                  className="img-obj"
                />
              </div>
            )}
            <label htmlFor="background" className="img-label mb-2">
              <input
                type="file"
                accept="image/*"
                hidden
                id="background"
                onChange={(e) => {
                  setBackground(e.target.files![0]);
                  setBackgroundBlob(e.target.files![0]);
                }}
              />
              <span>Upload background</span>
              <FontAwesomeIcon icon={faUpload} className="upload-icon" />
            </label>
            {background && (
              <div className="box mb-1">
                <img
                  src={URL.createObjectURL(background)}
                  alt="img"
                  className="img-obj"
                />
              </div>
            )}
            <textarea
              name=""
              id=""
              cols={30}
              rows={4}
              placeholder="Write a short bio about your restaurant !"
            ></textarea>
            <button
              type="submit"
              className="btn"
              disabled={
                !logo || !background || !vatNum || !currency || isLoading
              }
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
            <span className="color-error text-center fs-2 my-1">{error}</span>
          </form>
          <div className="imgs home-right">
            <img
              src="../.././assets/images/food1.png"
              alt="food"
              className="food-img food-1"
              width="200"
              loading="lazy"
            />
            <img
              src="../.././assets/images/food2.png"
              alt="food"
              className="food-img food-2"
              width="200"
              loading="lazy"
            />
            <img
              src="../.././assets/images/food3.png"
              alt="food"
              className="food-img food-3"
              width="200"
              loading="lazy"
            />

            <img
              src="../.././assets/images/circle.svg"
              alt="circle shape"
              className="shape shape-1"
              width="25"
            />
            <img
              src="../.././assets/images/circle.svg"
              alt="circle shape"
              className="shape shape-2"
              width="15"
            />
            <img
              src="../.././assets/images/circle.svg"
              alt="circle shape"
              className="shape shape-3"
              width="30"
            />
            <img
              src="../.././assets/images/ring.svg"
              alt="ring shape"
              className="shape shape-4"
              width="60"
            />
            <img
              src="../.././assets/images/ring.svg"
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
