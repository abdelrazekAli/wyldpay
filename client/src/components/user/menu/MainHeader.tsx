import "../../../styles/menu/header.sass";
import { RestaurantProps } from "../../../types/Restaurant";

export const MainHeader = ({ restaurant }: { restaurant: RestaurantProps }) => {
  return (
    <div className="header-wrapper">
      <div
        className="menu-header"
        style={{
          backgroundImage: `url(${restaurant.background})`,
        }}
      >
        <div className="logo">
          <img src={restaurant.logo} alt="" />
        </div>
      </div>
    </div>
  );
};
