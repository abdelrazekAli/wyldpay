import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "../../../styles/forms/editBank.sass";
import { BankProps } from "../../../types/Bank";
import { getUser } from "../../../redux/user.slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../../../redux/store.hooks";
import { paymentSchema } from "../../../validations/paymentSchema";

export const EditBankForm = () => {
  const { _id } = useAppSelector(getUser);
  const [check, setCheck] = useState<boolean>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [bankData, setBankData] = useState<BankProps | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      // Fetch bank data
      const res = await axios.get(`/api/v1/banks/${_id}`);
      setBankData(res.data);
      setCheck(res.data.customerFees);
    };
    fetchItems();
  }, [_id]);

  // Handle submit
  const onSubmit = async (data: object) => {
    try {
      setError(null);
      setSuccess(null);
      await axios.put("/api/v1/banks", {
        ...data,
        userId: _id,
        customerFees: check,
      });

      setSuccess("Bank info updated successfully!");
      setisLoading(false);
    } catch (err) {
      console.log(err);
      setSuccess(null);
      setisLoading(false);
      setError("Somthing went wrong!");
    }
  };

  // Inputs validation
  type Props = yup.InferType<typeof paymentSchema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Props>({
    resolver: yupResolver(paymentSchema),
  });

  useEffect(() => {
    reset(bankData!);
  }, [reset, bankData]);

  return (
    <div className="bank-form">
      {error && (
        <span className="error color-error d-block mt-4 text-center fs-2">
          {error}
        </span>
      )}
      {success && (
        <span className="mb--2 font-bold color-green  d-block mt-4 text-center fs-2">
          {success}
        </span>
      )}
      <div className="btn-container">
        <button
          form="bank-form"
          type="submit"
          className="btn"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Save edits"}
        </button>
      </div>
      <div className="container">
        <h3>Banking info</h3>

        <form id="bank-form" onSubmit={handleSubmit((data) => onSubmit(data))}>
          <div className="input-group">
            <label htmlFor="bankName">Bank name</label>
            <input id="bankName" type="text" {...register("name")} />
            <span className="error">{errors?.name?.message}</span>
          </div>
          <div className="input-group">
            <label htmlFor="iban">IBAN</label>

            <input id="iban" type="text" {...register("iban")} />
            <span className="error">{errors?.iban?.message}</span>
          </div>
          <div className="input-group">
            <label htmlFor="bic">BIC</label>

            <input id="bic" type="text" {...register("bic")} />
            <span className="error">{errors?.bic?.message}</span>
          </div>
          <div className="check">
            <input
              type="checkbox"
              name=""
              onChange={() => setCheck(!check)}
              checked={check}
            />
            <span>
              Check if you want to pass 2.9% + 29 cent charge fee to your
              customer.
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};