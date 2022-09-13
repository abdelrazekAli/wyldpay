import * as yup from "yup";
import { useState } from "react";
import { Modal } from "../user/Modal";
import "../../styles/forms/payForm.sass";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "../../validations/paymentSchema";

export const PayForm = () => {
  const [hideModal, setHideModal] = useState<boolean>(true);

  const onSubmit = () => {
    setHideModal(false);
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
      {!hideModal && <Modal status="signup" enableHide={false} />}
      <div className="container">
        <h3>
          Finally let's help you <br /> get paid!
        </h3>
        <p>
          Add your banking details and choose how to handle <br /> the
          processing fees.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Bank name"
              {...register("bankName")}
            />
            <span className="error">{errors?.bankName?.message}</span>
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
            <input type="checkbox" name="" />
            <span>
              Check if you want to pass 2.9% + 29 cent charge fee to your
              customer.
            </span>
          </div>
          <div className="btn-container">
            <button type="submit" className="btn">
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
