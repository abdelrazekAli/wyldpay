import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "../../../styles/forms/profileForm.sass";
import { UserProps } from "../../../types/UserProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { RestaurantProps } from "../../../types/Restaurant";
import { updateUserSchema } from "../../../validations/userSchema";
import { getUser, updateUsername } from "../../../redux/user.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector(getUser);
  const [file, setFile] = useState<string | Blob>("");
  const [logo, setLogo] = useState<null | File>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [isFormVisible, setFormVisible] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantProps | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      // Fetch user data
      const res = await axios.get(`/api/v1/restaurants/${_id}`);
      setRestaurant(res.data);
      setUserData(res.data.userId);
      setPhone(res.data.userId.phone);
    };
    fetchItems();
  }, [_id]);

  // Inputs validation
  type Props = yup.InferType<typeof updateUserSchema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: userData!,

    resolver: yupResolver(updateUserSchema),
  });

  useEffect(() => {
    reset(userData!);
  }, [reset, userData]);

  // Handle update profile submit
  const editProfile = async (data: UserProps) => {
    setError(null);
    setSuccess(null);
    if (!phone) return setPhoneError("Phone number required");

    setisLoading(true);
    delete data.confirmPassword;
    dispatch(updateUsername(data.firstName));
    try {
      if (file) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "uploads");

        const uploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_LINK!,
          formData
        );
        const { url } = uploadRes.data;

        await axios.put(`/api/v1/restaurants/logo`, {
          _id: restaurant?._id,
          logo: url,
        });
      }

      await axios.put(`/api/v1/users/${_id}`, {
        ...data,
        phone: +phone,
      });

      setSuccess("Profile updated successfully!");
      setisLoading(false);
    } catch (err: any) {
      setisLoading(false);
      setSuccess(null);
      if (err.response.status === 409) {
        setError("Email is already used.");
      } else {
        setError("Somthing went wrong!");
      }
      console.log(err);
    }
  };

  // Handle update payments methods
  const editPaymentMethods = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);

    try {
      await axios.put("/api/v1/banks/methods", {
        paymentsMethods: [
          { name: "stripe", publicKey: publicKey, secretKey: secretKey },
        ],
        userId: _id,
      });
      setFormVisible(!isFormVisible);
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  return (
    <>
      {error && (
        <span className="error color-error  d-block mt-4 text-center fs-3">
          {error}
        </span>
      )}
      {success && (
        <span className="font-bold color-green  d-block mt-4 text-center fs-3">
          {success}
        </span>
      )}

      <div className="profile-form">
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
                <h2>Payment methods</h2>
                <div className="card">
                  <div className="img">
                    <img src="../../assets/images/stripe-logo.png" alt="" />
                  </div>
                </div>
                <form onSubmit={editPaymentMethods}>
                  <input
                    type="text"
                    placeholder="Public key"
                    onChange={(e) => setPublicKey(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Secret key"
                    onChange={(e) => setSecretKey(e.target.value)}
                  />
                  <button
                    disabled={!publicKey || !secretKey}
                    type="submit"
                    className="btn"
                  >
                    {isLoading ? "Loading..." : "Save"}
                  </button>
                </form>
              </div>
              {error && (
                <span className="color-error text-center fs-2 my-1">
                  {error}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="column">
          <h3>Profile</h3>
          <p className="d-none-mobile">Keep your information up-to-date.</p>
          <form
            id="profile-form"
            onSubmit={handleSubmit((data) => editProfile(data))}
          >
            <div className="input-group">
              <label htmlFor="firstName">First name</label>
              <input id="firstName" type="text" {...register("firstName")} />
              <span className="error">{errors?.firstName?.message}</span>
            </div>
            <div className="input-group">
              <label htmlFor="lastName">Last name</label>

              <input id="lastName" type="text" {...register("lastName")} />
              <span className="error">{errors?.lastName?.message}</span>
            </div>
            <div className="input-group">
              <label htmlFor="businessName">Business name</label>

              <input
                id="businessName"
                type="text"
                {...register("businessName")}
              />
              <span className="error">{errors?.businessName?.message}</span>
            </div>

            <div className="input-group">
              <label htmlFor="businessAddress">Business address</label>

              <input
                id="businessAddress"
                type="text"
                {...register("businessAddress")}
              />
              <span className="error">{errors?.businessAddress?.message}</span>
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>

              <input id="city" type="text" {...register("city")} />
              <span className="error">{errors?.city?.message}</span>
            </div>
            <div className="input-group">
              <label htmlFor="state">State</label>

              <input id="state" type="text" {...register("state")} />
              <span className="error">{errors?.state?.message}</span>
            </div>
            <div className="input-group">
              <label htmlFor="zip">Zip</label>

              <input id="zip" type="text" {...register("zip")} />
              <span className="error">{errors?.zip?.message}</span>
            </div>
          </form>
        </div>
        <div className="column ">
          <div className="btn-container justify-content-end mb-6">
            <button
              className="btn w-15"
              type="submit"
              form="profile-form"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Save edits"}
            </button>
          </div>
          <label>Logo</label>
          <div className="img-box">
            <label htmlFor="logo" className="mb-0">
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
              {file ? (
                <img
                  src={URL.createObjectURL(logo!)}
                  alt="img"
                  className="img-obj"
                />
              ) : (
                <img src={restaurant?.logo} alt="" />
              )}
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input id="email" type="email" {...register("email")} />
            <span className="error">{errors?.email?.message}</span>
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone number</label>
            <PhoneInput
              inputProps={{
                style: {
                  outline: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  background: "#f2f2f2",
                  fontSize: "1.5rem",
                },
              }}
              specialLabel={""}
              preferredCountries={["de"]}
              value={String(userData?.phone)}
              onChange={(value) => setPhone(value)}
            />
            {phoneError && <span className="error">{phoneError}</span>}
          </div>
          <label>Password</label>
          <Link
            to={"/admin/send-reset-pass"}
            state={userData?.email}
            className="color-green font-bold fs-2 cursor-pointer"
          >
            <div className="fixed-box">Send reset link</div>
          </Link>
          <label>Bank</label>
          <Link
            to={"/admin/bank"}
            className="color-green font-bold fs-2 cursor-pointer"
          >
            <div className="fixed-box">Update bank info</div>
          </Link>
          <label>Payment methods</label>
          <div
            className="fixed-box cursor-pointer"
            onClick={() => setFormVisible(!isFormVisible)}
          >
            <span className="color-green font-bold fs-2  ">
              Update payment methods
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
