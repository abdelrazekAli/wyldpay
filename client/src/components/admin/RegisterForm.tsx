import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "../../styles/forms/registerForm.sass";
import { userSchema } from "../../validations/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { StepperProps } from "../../types/StepperProps";

export const RegisterForm = ({ onClick }: StepperProps) => {
  const [phone, setPhone] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const onSubmit = () => {
    if (!phone) return setPhoneError("Phone number required");
    onClick();
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

  return (
    <div className="register-form">
      <h3>Let's get started</h3>
      <p>
        Enter your information to activate <br /> your account.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              onChange={(value) => setPhone(value)}
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
        <div className="input-break">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
            />
            <span className="error">{errors?.email?.message}</span>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <span className="error">{errors?.password?.message}</span>
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">
            Get started
          </button>
        </div>
      </form>
    </div>
  );
};
