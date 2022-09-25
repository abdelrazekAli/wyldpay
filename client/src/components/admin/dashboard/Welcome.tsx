import { Link } from "react-router-dom";
import { useAppSelector } from "../../../redux/store.hooks";
import { getUser } from "../../../redux/user.slice";
import "../../../styles/welcome.sass";

export const Welcome = () => {
  const user = useAppSelector(getUser);

  return (
    <section className="welcome-wrapper">
      <div className="container">
        <div className="grid-cols-2">
          <div className="grid-item-1">
            <h1 className="main-heading">
              Hey <span className="capitalize">{user.firstName},</span> <br />
              Welcome to Dashboard!
            </h1>
            <p className="info-text">
              Here you can see the performance of your restaurant.
            </p>

            <div className="btn_wrapper">
              <Link to={"/admin/tables"}>
                <button className="btn view_more_btn">
                  Generate QR <i className="fas fa-arrow-right"></i>
                </button>
              </Link>
              <Link to={"/admin/menu"}>
                <button className="btn documentation_btn">Edit menu</button>
              </Link>
            </div>
          </div>
          <div className="grid-item-2">
            <div className="team_img_wrapper">
              <img src="../../assets/images/team.svg" alt="team-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
