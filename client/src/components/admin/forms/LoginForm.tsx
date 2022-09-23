import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../../styles/forms/loginFrom.sass";
import { login } from "../../../redux/user.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../redux/store.hooks";
import { RegisteredUserProps } from "../../../types/UserProps";
import { loginSchema } from "../../../validations/loginSchema";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Login handler
  const loginHandler = (userData: RegisteredUserProps) => {
    dispatch(login(userData));
  };

  // Show/Hide password
  const [hidePass, setHidePass] = useState<boolean>(true);

  // Inputs validation
  type Props = yup.InferType<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setError(null);
    setisLoading(true);

    try {
      let res = await axios.post("/api/v1/login", data);
      console.log(res.data);
      loginHandler(res.data);
      // window.location.replace("/admin/profile");
      setError(null);
      setisLoading(false);
      console.log(res);
    } catch (err: any) {
      setisLoading(false);

      let statusCode = err.response.status;
      if (statusCode === 400 || statusCode === 401) {
        setError("Invalid email or password");
      } else {
        setError("Somthing went wrong!");
      }
      console.log(err);
    }
  };

  return (
    <div className="login-form">
      <div className="container">
        <h3>Sign in</h3>
        <p>
          New user?
          <Link to={"/admin/signup"}>Create an account</Link>
        </p>

        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Email address"
              {...register("email")}
              className="mb-1"
            />
            <span className="error">{errors?.email?.message}</span>
          </div>
          <div className="input-group pass-wrapper">
            <input
              type={hidePass ? "password" : "text"}
              placeholder="Password"
              {...register("password")}
            />
            <i
              className={!hidePass ? "fa fa-eye" : "fa fa-eye-slash"}
              onClick={() => setHidePass(!hidePass)}
            ></i>
          </div>
          <span className="error">{errors?.password?.message}</span>
          <div className="d-flex">
            <div className="check">
              <input type="checkbox" name="" />
              <span>Keep me logged in</span>
            </div>
            <Link
              to={"/admin/send-reset-pass"}
              className="fs-2 color-green m-half"
            >
              Forgot password?
            </Link>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </div>
        </form>
        {error && (
          <span className="error d-block text-center fs-2">{error}</span>
        )}
        {/* <div className="parent-login-line">
          <span className="login-line mt-2">or</span>
        </div> */}
      </div>
    </div>
  );
};
