import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "../../styles/forms/registerForm.sass";
import { StepperProps } from "../../types/StepperProps";

export const RegisterForm = ({ onClick }: StepperProps) => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onClick();
  };

  return (
    <div className="register-form">
      <h3>Let's get started</h3>
      <p>
        Enter your information to activate <br /> your account.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="input-break">
          <input required type="text" placeholder="First name" />
          <input required type="text" placeholder="Last name" />
        </div>
        <div className="input-break">
          <input required type="text" placeholder="Business name" />
          <div style={{ width: "calc(100% + 38px)" }}>
            <PhoneInput
              inputProps={{
                required: true,
                style: {
                  outline: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  background: "#f2f2f2",
                  fontSize: "1.5rem",
                },
              }}
              specialLabel={""}
              preferredCountries={["de"]}
              placeholder={"Phone number"}
              onChange={() => console.log("")}
            />
          </div>
        </div>
        <input required type="text" placeholder="Business address" />
        <div className="input-break">
          <input required type="text" placeholder="City" />
          <input required type="text" placeholder="State" />
          <input required type="text" placeholder="Zip code" />
        </div>
        <div className="input-break">
          <input required type="email" placeholder="Email address" />
          <input
            required
            type="password"
            placeholder="Password"
            minLength={6}
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">
            Get started
          </button>
        </div>
      </form>
    </div>
  );
};
