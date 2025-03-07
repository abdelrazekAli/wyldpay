import { Footer } from "./Footer";
import api from "../../../utils/API";
import { Items } from "../items/Items";
import "../../../styles/menu/menu.sass";
import { MainHeader } from "./MainHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ViewOrderBtn } from "./ViewOrderBtn";
import { CircularProgress } from "@mui/material";
import { MainCategories } from "./MainCategories";
import { ProductType } from "../../../types/Product";
import { useAppDispatch, useAppSelector } from "../../../redux/store.hooks";
import {
  fetchRestaurant,
  getRestaurantState,
} from "../../../redux/restaurant.slice";

export const Menu = () => {
  const { restId } = useParams();
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector(getRestaurantState);

  const [items, setItems] = useState<ProductType[]>([]);

  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch restaurant data
    dispatch(fetchRestaurant(restId!));

    // Fetch items
    const fetchItems = async () => {
      setError(false);
      try {
        const res = await api.get(`/items/restaurant/${restId}`);
        setItems(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [restId, dispatch]);

  return (
    <>
      {!isLoading && (
        <>
          {restaurant.data ? (
            <>
              <MainHeader restaurant={restaurant.data} />
              <MainCategories categories={restaurant.data.categories} />
              {items.length > 0 && (
                <Items items={items} categories={restaurant.data.categories} />
              )}
              <ViewOrderBtn />
              <Footer />
              {(restaurant.error || error) && (
                <span className="error color-error d-block mt-4 text-center fs-3">
                  Something went wrong!
                </span>
              )}
            </>
          ) : (
            <span className="error color-error d-block mt-4 text-center fs-3">
              Invalid menu link!
            </span>
          )}
        </>
      )}

      {isLoading || restaurant.loading ? (
        <div className="p-5 text-center">
          <CircularProgress color="inherit" size="25px" />
        </div>
      ) : null}
    </>
  );
};
