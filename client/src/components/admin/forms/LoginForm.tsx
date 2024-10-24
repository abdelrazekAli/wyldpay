import * as yup from "yup";
import { useState } from "react";
import api from "../../../utils/API";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../../redux/user.slice";
import "../../../styles/forms/loginFromModal.sass";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../redux/store.hooks";
import { SendRegisterLinkForm } from "./SendRegisterLinkForm";
import { RegisteredUserProps } from "../../../types/UserProps";
import { loginSchema } from "../../../validations/loginSchema";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rightPanel, setRightPanel] = useState<boolean>(false);

  // Login handler
  const loginHandler = (userData: RegisteredUserProps) => {
    dispatch(
      login({ ...userData, API_VERSION: process.env.REACT_APP_API_VERSION! })
    );
  };

  // Inputs validation
  type Props = yup.InferType<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(loginSchema),
  });

  // Handle login submit
  const onSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    setIsLoading(true);
    localStorage.clear();

    try {
      let res = await api.post(`/auth/login`, data);
      loginHandler(res.data);
      setError(null);
    } catch (err: any) {
      let statusCode = err.response?.status;
      if (statusCode === 400 || statusCode === 401) {
        setError("Invalid email or password");
      } else if (statusCode === 429) {
        setError("Too many requests, please try again later");
      } else {
        setError("Something went wrong!");
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-modal">
      <div>
        <div
          className={rightPanel ? `container right-panel-active` : `container`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <SendRegisterLinkForm />
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <h1 className="h1-mb-1">Sign in</h1>
              <input type="email" placeholder="Email" {...register("email")} />

              <span className="error">{errors?.email?.message}</span>

              <input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <span className="error">{errors?.password?.message}</span>

              <div className="links">
                <Link to={"/admin/send-reset-pass"} className="forget-password">
                  Forgot password?
                </Link>
                <div
                  className="color-main text-right w-100 cursor-pointer d-only-mobile"
                  onClick={() => setRightPanel(!rightPanel)}
                >
                  Create account
                </div>
              </div>
              <button type="submit" className="login-btn" disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign in"}
              </button>
              <span className="error d-block text-center fs-2 main-error">
                {error}
              </span>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="border-white register-button"
                  id="signIn"
                  onClick={() => setRightPanel(!rightPanel)}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your business details and start journey with us</p>
                <button
                  className="border-white register-button"
                  id="signUp"
                  onClick={() => setRightPanel(!rightPanel)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
