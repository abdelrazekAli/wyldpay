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
  const [check, setCheck] = useState<boolean>();
  const { _id, accessToken } = useAppSelector(getUser);
  const [bankData, setBankData] = useState<BankProps | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      // Fetch bank data
      try {
        const res = await axios.get(`/api/v1/banks/${_id}`);

        setBankData(res.data);
        setCheck(res.data.customerFees);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, [_id]);

  // Handle submit
  const onSubmit = async (data: BankProps) => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);

      delete data.paymentsMethods;

      await axios.put(
        "/api/v1/banks",
        {
          ...data,
          customerFees: check,
        },
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );

      setSuccess("Bank info updated successfully!");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setSuccess(null);
      setLoading(false);
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
    <div className="bank-form w-100">
      {error && (
        <span className="error color-error d-block mt-4 text-center fs-3">
          {error}
        </span>
      )}
      {success && (
        <span className="mb-1 font-bold color-main  d-block mt-4 text-center fs-3">
          {success}
        </span>
      )}
      <div className="btn-container btn-custom-container">
        <button
          form="edit-bank"
          type="submit"
          className="btn"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Save edits"}
        </button>
      </div>
      <div className="container">
        <h3>Banking info</h3>

        <form
          id="edit-bank"
          onSubmit={handleSubmit((data: any) => onSubmit(data))}
        >
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
