import { useState } from "react";
import api from "../../../utils/API";

export const SendRegisterLinkForm = () => {
  const [email, setEmail] = useState<string | null>(null);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle sending email
  const sendingEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email) return setError("Please enter an email");

    setIsLoading(true);
    try {
      await api.post(`/emails/send-register-token`, {
        email,
      });
      setSuccess(true);
    } catch (err: any) {
      let statusCode = err.response?.status;
      if (statusCode === 409) {
        setError("Email is already used");
      } else {
        setError("Something went wrong!");
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={sendingEmail}>
          <h1 className="h1-mb-1">Sign up</h1>
          <input
            type="email"
            placeholder="Enter your email address"
            className="mb-2"
            onChange={(e) => {
              setError(null);
              setEmail(e.target.value);
            }}
          />
          <button className="mb-1 login-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Get Magic link"}
          </button>
          <span className="error text-center mb-1">{error}</span>
          <span className="color-span">
            We'll email you a magic link to register.
          </span>
        </form>
      ) : (
        <div className="success-container">
          <img
            src="/assets/images/mailbox.webp"
            alt="food"
            className="food-img food-2"
            width="200"
            loading="lazy"
          />
          <h1>Email sent</h1>
          <p>
            We sent an email to you, it contains a magic link that'll sign you
            up.
          </p>
        </div>
      )}
    </>
  );
};
