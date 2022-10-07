import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/forms/loginFrom.sass";
import { Modal } from "../../user/layouts/Modal";
import { Link, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassSchema } from "../../../validations/resetPassSchema";

export const ResetPassForm = () => {
  const { userId, token } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [hideModal, setHideModal] = useState<boolean>(true);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Inputs validation
  type Props = yup.InferType<typeof resetPassSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(resetPassSchema),
  });

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    setError(null);
    setisLoading(true);

    try {
      await axios.post(`/api/v1/pass/reset/${userId}/${token}`, {
        password: data.password,
      });
      setError(null);
      setHideModal(false);
      setisLoading(false);
    } catch (err: any) {
      setisLoading(false);
      let statusCode = err.response.status;
      if (statusCode === 401) {
        setError("Invalid link or expired");
      } else {
        setError("Somthing went wrong!");
      }
      console.log(err);
    }
  };

  return (
    <div className="login-form">
      {!hideModal && <Modal status="password reset" enableHide={false} />}
      <div className="container">
        <h3>Reset password</h3>
        <p>
          Cancel?
          <Link to={"/admin/login"}>Back to login</Link>
        </p>

        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter new password"
              {...register("password")}
              className="mb-1"
            />
            <span className="error">{errors?.password?.message}</span>
          </div>{" "}
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className="mb-1"
            />
            <span className="error">{errors?.confirmPassword?.message}</span>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Reset password"}
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
