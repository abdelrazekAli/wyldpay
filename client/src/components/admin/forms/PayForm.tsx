import axios from "axios";
import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/forms/payForm.sass";
import { login } from "../../../redux/user.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "../../../redux/store.hooks";
import { RegisteredUserProps } from "../../../types/UserProps";
import { paymentSchema } from "../../../validations/paymentSchema";

export const PayForm = () => {
  const dispatch = useAppDispatch();
  const [check, setCheck] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Login handler
  const loginHandler = (userData: RegisteredUserProps) => {
    dispatch(login(userData));
  };

  const onSubmit = async (data: object) => {
    try {
      setError(null);
      const userId = localStorage.getItem("userId");
      const res = await axios.post("/api/v1/banks", {
        ...data,
        userId,
        customerFees: check,
      });
      localStorage.clear();
      loginHandler(res.data);
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  // Inputs validation
  type Props = yup.InferType<typeof paymentSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(paymentSchema),
  });

  return (
    <div className="pay-form">
      <div className="container">
        <h3>
          Finally let's help you <br /> get paid!
        </h3>
        <p>
          Add your banking details and choose how to handle <br /> the
          processing fees.
        </p>
        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="input-group">
            <input type="text" placeholder="Bank name" {...register("name")} />
            <span className="error">{errors?.name?.message}</span>
          </div>
          <div className="input-group">
            <input type="text" placeholder="IBAN" {...register("iban")} />
            <span className="error">{errors?.iban?.message}</span>
          </div>
          <div className="input-group">
            <input type="text" placeholder="BIC" {...register("bic")} />
            <span className="error">{errors?.bic?.message}</span>
          </div>
          <div className="check">
            <input type="checkbox" name="" onChange={() => setCheck(!check)} />
            <span>
              Check if you want to pass 2.9% + 29 cent charge fee to your
              customer.
            </span>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Finish"}
            </button>
          </div>
          <div className="d-flex">
            <span className="color-error text-center fs-2 my-1">{error}</span>
          </div>
        </form>
      </div>
    </div>
  );
};
