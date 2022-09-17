import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../styles/forms/loginFrom.sass";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendResetPassSchema } from "../../validations/sendResetPassSchema";

export const SendResetPassForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Inputs validation
  type Props = yup.InferType<typeof sendResetPassSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(sendResetPassSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    setError(null);
    setisLoading(true);

    try {
      let res = await axios.post("/api/v1/pass/send-reset", data);
      // Send email with res data
      setError(null);
      setisLoading(false);
      console.log(res);
    } catch (err: any) {
      setisLoading(false);

      let statusCode = err.response.status;
      if (statusCode === 401) {
        setError("Email is not registered yet");
      } else {
        setError("Somthing went wrong!");
      }
      console.log(err);
    }
  };

  return (
    <div className="login-form">
      <div className="container">
        <h3>Reset password</h3>
        <p>
          Cancel?
          <Link to={"/admin/login"}>Back to login</Link>
        </p>

        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter your email address"
              {...register("email")}
              className="mb-1"
            />
            <span className="error">{errors?.email?.message}</span>
          </div>

          <div className="btn-container">
            <button type="submit" className="btn">
              {isLoading ? "Loading..." : "Send reset link"}
            </button>
          </div>
        </form>
        {error && (
          <span className="error d-block text-center fs-2">{error}</span>
        )}
      </div>
    </div>
  );
};
