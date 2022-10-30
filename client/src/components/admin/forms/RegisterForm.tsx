import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useParams } from "react-router-dom";
import "../../../styles/forms/registerForm.sass";
import { UserProps } from "../../../types/UserProps";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepperProps } from "../../../types/StepperProps";
import { userSchema } from "../../../validations/userSchema";

export const RegisterForm = ({ onClick }: StepperProps) => {
  const { token } = useParams();
  const [phone, setPhone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const onSubmit = async (data: UserProps) => {
    setError(null);
    if (!phone) return setPhoneError("Phone number required");

    setisLoading(true);
    delete data.confirmPassword;

    try {
      let res = await axios.post("/api/v1/register", {
        ...data,
        phone: +phone,
      });
      localStorage.setItem("userId", res.data._id);
      onClick();
    } catch (err: any) {
      setisLoading(false);
      if (err.response.status === 409) {
        setError("Email is already used");
      } else {
        setError("Somthing went wrong!");
      }
      console.log(err);
    }
  };

  // Inputs validation
  type Props = yup.InferType<typeof userSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(userSchema),
  });

  // Decode token
  const decodedToken = jwt_decode(token!) as {
    exp: number;
    iat: number;
    email: string;
  };

  return (
    <div className="register-form">
      <h3>Let's get started</h3>
      <p>
        Enter your information to activate <br /> your account.
      </p>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="input-break">
          <div className="input-group">
            <input
              type="text"
              placeholder="First name"
              {...register("firstName")}
            />
            <span className="error">{errors?.firstName?.message}</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Last name"
              {...register("lastName")}
            />
            <span className="error">{errors?.lastName?.message}</span>
          </div>
        </div>
        <div className="input-break">
          <div className="input-group">
            <input
              type="text"
              placeholder="Business name"
              {...register("businessName")}
            />
            <span className="error">{errors?.businessName?.message}</span>
          </div>
          <div className="input-group">
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
              placeholder={"Phone number"}
              onChange={(value) => {
                setPhone(value);
                setError(null);
              }}
            />
            {phoneError && <span className="error">{phoneError}</span>}
          </div>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder="Business address"
            {...register("businessAddress")}
          />
          <span className="error">{errors?.businessAddress?.message}</span>
        </div>
        <div className="input-break">
          <div className="input-group">
            <input type="text" placeholder="City" {...register("city")} />
            <span className="error">{errors?.city?.message}</span>
          </div>
          <div className="input-group">
            <input type="text" placeholder="State" {...register("state")} />
            <span className="error">{errors?.state?.message}</span>
          </div>
          <div className="input-group">
            <input type="text" placeholder="Zip code" {...register("zip")} />
            <span className="error">{errors?.zip?.message}</span>
          </div>
        </div>
        <input
          type="email"
          hidden
          value={decodedToken.email}
          {...register("email")}
        />
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <span className="error">{errors?.password?.message}</span>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <span className="error">{errors?.confirmPassword?.message}</span>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Get started"}
          </button>
        </div>
        <span className="error d-block my-2 text-center fs-2">{error}</span>
      </form>
    </div>
  );
};
