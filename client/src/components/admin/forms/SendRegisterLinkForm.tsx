import axios from "axios";
import { useState } from "react";

export const SendRegisterLinkForm = () => {
  const [email, setEmail] = useState<string | null>(null);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  // Handle sending email
  const sendingEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(null);
    setisLoading(true);
    if (!email) return setError("Please enter an email");
    try {
      const res = await axios.post(`/api/v1/emails/send-register-token`, {
        email,
      });
      setSuccess(true);
      setisLoading(false);
    } catch (err: any) {
      setisLoading(false);
      let statusCode = err.response.status;
      if (statusCode === 409) {
        setError("Email is already used");
      } else {
        setError("Somthing went wrong!");
      }
      console.log(err);
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
            src=".././assets/images/mailbox.webp"
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
