import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useForm } from "react-hook-form";
import "../../../styles/forms/loginFrom.sass";
import { Modal } from "../../user/layouts/Modal";
import { Link, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendResetPassSchema } from "../../../validations/sendResetPassSchema";

export const SendResetPassForm = () => {
  const email = useLocation().state;
  const [error, setError] = useState<string | null>(null);
  const [hideModal, setHideModal] = useState<boolean>(true);
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
      await axios.post("/api/v1/emails/send-reset-token", data);

      setHideModal(false);
      setError(null);
      setisLoading(false);
    } catch (err: any) {
      setisLoading(false);
      let statusCode = err.response?.status;
      if (statusCode === 401) {
        setError("Email is not registered yet");
      } else {
        setError("Somthing went wrong!");
      }
      console.log(err);
    }
  };

  return (
    <>
      {!hideModal && <Modal status="send link" enableHide={false} />}

      <div className="login-form">
        <div className="container">
          <h3>Reset password</h3>
          {!email ? (
            <p>
              Cancel?
              <Link to={"/admin/login"}>Back to login</Link>
            </p>
          ) : (
            <p>
              Cancel?
              <Link to={"/admin/settings"}>Back to profile</Link>
            </p>
          )}

          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="input-group">
              <input
                type="text"
                required
                placeholder="Enter your email address"
                defaultValue={email ? String(email) : ""}
                {...register("email")}
                className="mb-1"
              />
              <span className="error">{errors?.email?.message}</span>
            </div>

            <div className="btn-container">
              <button type="submit" className="btn" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send reset link"}
              </button>
            </div>
          </form>
          <span className="error d-block text-center fs-2">{error}</span>
        </div>
      </div>
    </>
  );
};
