import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "../../../styles/forms/profileForm.sass";
import { PaypalKeysForm } from "./PaypalKeysForm";
import { StripeKeysForm } from "./StripeKeysForm";
import { SocialLinksForm } from "./SocialLinksForm";
import { UserProps } from "../../../types/UserProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { RestaurantProps } from "../../../types/Restaurant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUser, updateUsername } from "../../../redux/user.slice";
import { updateProfileSchema } from "../../../validations/userSchema";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";

export const SettingsForms = () => {
  const dispatch = useAppDispatch();
  const { _id, accessToken } = useAppSelector(getUser);

  const [phoneNum, setPhoneNum] = useState<string>("");
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [restaurant, setRestaurant] = useState<RestaurantProps | null>(null);

  const [logo, setLogo] = useState<null | File>(null);
  const [logoBlob, setLogoBlob] = useState<string | Blob>("");
  const [background, setBackground] = useState<null | File>(null);
  const [backgroundBlob, setBackgroundBlob] = useState<string | Blob>("");

  const [isLinksFormVisible, setLinksFormVisible] = useState<boolean>(false);
  const [isPaypalFormVisible, setPaypalFormVisible] = useState<boolean>(false);
  const [isStripeFormVisible, setStripeFormVisible] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/v1/restaurants/user/${_id}`);
        setRestaurant(res.data);
        setPhoneNum(res.data.userId.phone);
        setUserData({
          ...res.data.userId,
          vatNum: res.data.vatNum,
          vatPercentage: res.data.vatPercentage,
        });
      } catch (err) {
        console.log(err);
        setError("Something went wrong on fetch profile data!");
      }
    };
    fetchData();
  }, [_id]);

  // Inputs validation
  type Props = yup.InferType<typeof updateProfileSchema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    defaultValues: userData!,

    resolver: yupResolver(updateProfileSchema),
  });

  // Reset user data for validation
  useEffect(() => {
    reset(userData!);
  }, [reset, userData]);

  // Handle update profile submit
  const editProfile = async (data: UserProps) => {
    setError(null);
    setSuccess(null);
    if (!phoneNum) return setError("Phone number required");

    setisLoading(true);
    delete data.confirmPassword;
    delete data.socialLinks;
    delete data.stripeCustomerId;

    try {
      // Update user data
      await axios.put(
        `/api/v1/users`,
        {
          ...data,
          phone: +phoneNum,
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );

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

      // Update restaurant data
      await axios.put(
        `/api/v1/restaurants`,
        {
          vatNum: data.vatNum,
          vatPercentage: data.vatPercentage,
          logo: logoUploadRes?.data.url,
          background: backgroundUploadRes?.data.url,
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );

      setisLoading(false);
      dispatch(updateUsername(data.firstName));
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      console.log(err);
      setSuccess(null);
      setisLoading(false);

      if (err.response.status === 409) {
        setError("Email is already used");
      } else {
        setError("Something went wrong!");
      }
    }
  };

  return (
    <>
      <div className="w-100">
        <div>
          <span className="error color-error  d-block mt-4 text-center fs-3">
            {error}
          </span>

          {success && (
            <span className="font-bold color-main  d-block  text-center fs-3">
              {success}
            </span>
          )}
        </div>

        <div className="profile-form w-100">
          {isStripeFormVisible && (
            <StripeKeysForm hideForm={() => setStripeFormVisible(false)} />
          )}
          {isPaypalFormVisible && (
            <PaypalKeysForm hideForm={() => setPaypalFormVisible(false)} />
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
                <span className="error">
                  {errors?.businessAddress?.message}
                </span>
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
                    setError(null);
                  }}
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>

                <input id="email" type="email" {...register("email")} />
                <span className="error">{errors?.email?.message}</span>
              </div>
              <label>Password</label>
              <Link
                to={"/admin/send-reset-pass"}
                state={userData?.email}
                className="color-main font-bold fs-2 cursor-pointer"
              >
                <div className="fixed-box">Send reset link</div>
              </Link>
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
            <div className="img-box p-relative">
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
                <FontAwesomeIcon icon={faPen} className="icon-img-edit" />
              </label>
            </div>
            <label>Background</label>
            <div className="img-box p-relative">
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
                <FontAwesomeIcon icon={faPen} className="icon-img-edit" />
              </label>
            </div>
            <div className="input-group">
              <label htmlFor="vat">VAT number</label>

              <input id="vatNum" type="text" {...register("vatNum")} />
              <span className="error">{errors?.vatNum?.message}</span>
            </div>
            <div className="input-group">
              <label htmlFor="vat">VAT percentage</label>

              <input
                id="vat"
                type="number"
                max={100}
                {...register("vatPercentage")}
              />
              <span className="error">{errors?.vatPercentage?.message}</span>
            </div>
            <label>Social links</label>
            <div
              className="fixed-box cursor-pointer"
              onClick={() => setLinksFormVisible(!isLinksFormVisible)}
            >
              <span className="color-main font-bold fs-2  ">
                Update social links
              </span>
            </div>
            <label>Bank</label>
            <Link
              to={"/admin/bank"}
              className="color-main font-bold fs-2 cursor-pointer"
            >
              <div className="fixed-box">Update bank info</div>
            </Link>
            <label>Stripe credentials</label>
            <div
              className="fixed-box cursor-pointer"
              onClick={() => setStripeFormVisible(!isStripeFormVisible)}
            >
              <span className="color-main font-bold fs-2  ">
                Update stripe keys
              </span>
            </div>
            <label>PayPal credentials</label>
            <div
              className="fixed-box cursor-pointer"
              onClick={() => setPaypalFormVisible(!isPaypalFormVisible)}
            >
              <span className="color-main font-bold fs-2  ">
                Update paypal keys
              </span>
            </div>
            {/* <label>Crypto credentials</label>
          <div className="fixed-box cursor-pointer">
            <span className="color-main font-bold fs-2  ">
              Update crypto keys
            </span>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
