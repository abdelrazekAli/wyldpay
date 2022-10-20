import "../../../styles/welcome.sass";
import { Link } from "react-router-dom";
import { getUser } from "../../../redux/user.slice";
import { useAppSelector } from "../../../redux/store.hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
              <Link to={"/admin/orders"}>
                <button className="btn view_more_btn">
                  View orders{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size={"sm"}
                    className="arrow-icon"
                  />
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
