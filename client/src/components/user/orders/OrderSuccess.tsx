import axios from "axios";
import { useEffect, useState } from "react";
import { Order } from "../../../types/Order";
import { useParams } from "react-router-dom";
import "../../../styles/menu/orderSuccess.sass";
import { CircularProgress } from "@material-ui/core";
import { RestaurantProps } from "../../../types/Restaurant";
import { downloadReceipt } from "../../../utils/orderReceipt";

export const Success = () => {
  const { restId, orderId } = useParams();
  const [order, setOrder] = useState<Order>();
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [restaurant, setRestaurant] = useState<RestaurantProps>();

  useEffect(() => {
    // Set scroll to top
    window.scrollTo(0, 0);

    // Fetch order and restaurant data
    const fetchData = async () => {
      try {
        const orderResponse = await axios.get(`/api/v1/orders/${orderId}`);
        const restaurantResponse = await axios.get(
          `/api/v1/restaurants/${restId}`
        );
        setOrder(orderResponse.data);
        setRestaurant(restaurantResponse.data);
        setisLoading(false);
      } catch (err) {
        setisLoading(false);
      }
    };

    fetchData();
  }, [orderId, restId]);

  return (
    <>
      {!isLoading && (!order || !restaurant) ? (
        <span className="error color-error d-block mt-4 text-center fs-3 mt-5">
          Something went wrong on fetch your order!
        </span>
      ) : null}
      {!isLoading && order && restaurant ? (
        <div className="order-success">
          <div className="success-icon">
            <img
              src="../../../../assets/images/payment-success-sm.png"
              alt=""
            />
          </div>
          <h1 className="heading-1">
            We've received your order <br /> and we'll prepare it right away
          </h1>
          <div className="google-rate">
            <div className="heading-2">Please rate us on Google</div>
            <a
              href={
                restaurant?.userId.socialLinks?.find(
                  (link) => link.name === "google"
                )?.value
              }
              target="_blank"
              // onClick={() =>
              //   window.open(
              //     `${
              //       restaurant?.userId.socialLinks?.find(
              //         (link) => link.name === "google"
              //       )?.value
              //     }`,
              //     "Google review",
              //     "width=800,height=600"
              //   )
              // }
              className="rate-wrapper"
            >
              <div className="text">
                <img src="../../../../assets/images/star.svg" alt="" />
                Evaluate
              </div>
              <div className="icon">
                <img src="../../../../assets/images/open-right.svg" alt="" />
              </div>
            </a>
          </div>
          <div className="social-links">
            <div className="heading-2">We're on social media</div>
            <div className="links">
              <a
                href={
                  restaurant?.userId.socialLinks?.find(
                    (link) => link.name === "instagram"
                  )?.value
                }
                target="_blank"
                className="link"
              >
                <img src="../../../../assets/images/insta.svg" alt="" />
              </a>
              <a
                href={
                  restaurant?.userId.socialLinks?.find(
                    (link) => link.name === "telegram"
                  )?.value
                }
                target="_blank"
                className="link"
              >
                <img src="../../../../assets/images/telegram.svg" alt="" />
              </a>
              <a
                href={
                  restaurant?.userId.socialLinks?.find(
                    (link) => link.name === "youtube"
                  )?.value
                }
                target="_blank"
                className="link"
              >
                <img src="../../../../assets/images/youtube.svg" alt="" />
              </a>
              <a
                href={
                  restaurant?.userId.socialLinks?.find(
                    (link) => link.name === "twitter"
                  )?.value
                }
                target="_blank"
                className="link"
              >
                <img src="../../../../assets/images/twitter.svg" alt="" />
              </a>
            </div>
          </div>
          <div
            className="invoice-btn-wrapper"
            onClick={() => downloadReceipt(order, restaurant)}
          >
            <div className="invoice-btn">Download Invoice</div>
          </div>
        </div>
      ) : null}
      {isLoading && (
        <div className="p-5 text-center mt-5">
          <CircularProgress color="inherit" size="25px" />
        </div>
      )}
    </>
  );
};
