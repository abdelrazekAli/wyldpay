import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "../../../styles/forms/profileForm.sass";
import { SocialLinksForm } from "./SocialLinksForm";
import { UserProps } from "../../../types/UserProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { PaymentMethodsForm } from "./PaymentMethodsForm";
import { RestaurantProps } from "../../../types/Restaurant";
import { updateUserSchema } from "../../../validations/userSchema";
import { getUser, updateUsername } from "../../../redux/user.slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const { _id } = useAppSelector(getUser);

  const [vatNum, setVatNum] = useState<string>("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantProps | null>(null);

  const [logo, setLogo] = useState<null | File>(null);
  const [logoBlob, setLogoBlob] = useState<string | Blob>("");
  const [background, setBackground] = useState<null | File>(null);
  const [backgroundBlob, setBackgroundBlob] = useState<string | Blob>("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [vatError, setVatError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isPaymentFormVisible, setPaymentFormVisible] =
    useState<boolean>(false);
  const [isLinksFormVisible, setLinksFormVisible] = useState<boolean>(false);

  // Fetch data from
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/restaurants/${_id}`);
      setRestaurant(res.data);
      setVatNum(res.data.vatNum);
      setUserData(res.data.userId);
      setPhoneNum(res.data.userId.phone);
    };
    fetchData();
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

  // Reset user data for validation
  useEffect(() => {
    reset(userData!);
  }, [reset, userData]);

  // Handle update profile submit
  const editProfile = async (data: UserProps) => {
    setError(null);
    setSuccess(null);
    if (!vatNum) return setVatError("VAT number required");
    if (!phoneNum) return setPhoneError("Phone number required");

    setisLoading(true);
    delete data.confirmPassword;
    delete data.socialLinks;

    try {
      // Update user data
      await axios.put(`/api/v1/users/${_id}`, {
        ...data,
        phone: +phoneNum,
      });

      // Update restaurant data
      let logoUploadRes, backgroundUploadRes;
      if (logoBlob) {
        let logoFormData = new FormData();
        logoFormData.append("file", logoBlob);
        logoFormData.append("upload_preset", "uploads");

        logoUploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_LINK!,
          logoFormData
        );
      }

      if (backgroundBlob) {
        let backgroundFormData = new FormData();
        backgroundFormData.append("file", backgroundBlob);
        backgroundFormData.append("upload_preset", "uploads");

        backgroundUploadRes = await axios.post(
          process.env.REACT_APP_CLOUDINARY_LINK!,
          backgroundFormData
        );
      }

      await axios.put(`/api/v1/restaurants`, {
        _id: restaurant?._id,
        logo: logoUploadRes?.data.url,
        vatNum,
        background: backgroundUploadRes?.data.url,
      });

      setisLoading(false);
      dispatch(updateUsername(data.firstName));
      setSuccess("Profile updated successfully!");
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
        {isPaymentFormVisible && (
          <PaymentMethodsForm hideForm={() => setPaymentFormVisible(false)} />
        )}

        {isLinksFormVisible && (
          <SocialLinksForm hideForm={() => setLinksFormVisible(false)} />
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
                onChange={(value) => {
                  setPhoneNum(value);
                  setPhoneError(null);
                }}
              />
              {phoneError && <span className="error">{phoneError}</span>}
            </div>
          </form>
        </div>
        <div className="column">
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
                  setLogoBlob(e.target.files![0]);
                }}
              />
              {logoBlob ? (
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
          <label>Background</label>
          <div className="img-box">
            <label htmlFor="background" className="mb-0">
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
              {backgroundBlob ? (
                <img
                  src={URL.createObjectURL(background!)}
                  alt="img"
                  className="img-obj"
                />
              ) : (
                <img src={restaurant?.background} alt="" />
              )}
            </label>
          </div>
          <div className="input-group">
            <label htmlFor="vat">VAT number</label>

            <input
              id="vat"
              type="text"
              value={vatNum!}
              onChange={(e) => {
                setVatNum(e.target.value);
                setVatError(null);
              }}
            />
            {vatError && <span className="error">{vatError}</span>}
          </div>
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
            onClick={() => setPaymentFormVisible(!isPaymentFormVisible)}
          >
            <span className="color-green font-bold fs-2  ">
              Update payment methods
            </span>
          </div>
          <label>Social links</label>
          <div
            className="fixed-box cursor-pointer"
            onClick={() => setLinksFormVisible(!isLinksFormVisible)}
          >
            <span className="color-green font-bold fs-2  ">
              Update social links
            </span>
          </div>
          <label>Password</label>
          <Link
            to={"/admin/send-reset-pass"}
            state={userData?.email}
            className="color-green font-bold fs-2 cursor-pointer"
          >
            <div className="fixed-box">Send reset link</div>
          </Link>
        </div>
      </div>
    </>
  );
};
