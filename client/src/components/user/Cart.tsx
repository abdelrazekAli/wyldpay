import "../../styles/cart.sass";
import { Payment } from "./Payment";
import { CartBox } from "./CartBox";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppSelector } from "../../redux/store.hooks";
import { getCartProducts, getTotalPrice } from "../../redux/cart.slice";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

export const Cart = () => {
  const cartProducts = useAppSelector(getCartProducts);
  const subPrice = useAppSelector(getTotalPrice);
  const totalPrice = subPrice + 0.1 * subPrice;
  return (
    <section className="shopping-cart-container active">
      {cartProducts?.length > 0 ? (
        <>
          <div className="products-container">
            <h3 className="title">Your foods</h3>

            <div className="box-container">
              {cartProducts.map((p) => (
                <CartBox key={p._id} product={p} />
              ))}
            </div>
          </div>

          <div className="cart-total">
            <h3 className="title">Payment</h3>
            <div className="box">
              <h3 className="subtotal">
                Subtotal : <span>${subPrice}</span>
              </h3>
              <h3 className="total">
                Total : <span>${totalPrice}</span>
              </h3>
              <Elements stripe={stripePromise}>
                <Payment totalPrice={totalPrice} />
              </Elements>
            </div>
          </div>
        </>
      ) : (
        <div className="products-container">
          <div className="image">
            <img src="./assets/images/shopping-bag.svg" alt="" />
          </div>
          <h3 className="title custom-title">Your foods cart is empty</h3>
        </div>
      )}
    </section>
  );
};
