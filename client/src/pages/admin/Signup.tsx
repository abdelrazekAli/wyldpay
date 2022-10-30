import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Navbar } from "../../components/admin/layouts/Navbar";
import { Stepper } from "../../components/admin/layouts/Stepper";

export const Signup = () => {
  const { token } = useParams();

  // This temporary and will be replaced when verify token API done
  const decodedToken = jwt_decode(token!) as {
    exp: number;
    iat: number;
    email: string;
  };

  return (
    <div>
      <Navbar />
      {decodedToken.exp * 1000 < Date.now() ? (
        <div className="fs-3 text-center my-2 color-main">
          This link is expired
        </div>
      ) : (
        <Stepper />
      )}
    </div>
  );
};
