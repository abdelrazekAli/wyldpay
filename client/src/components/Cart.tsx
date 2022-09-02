import "../styles/cart.sass";
import { CartBox } from "./CartBox";
import { useAppSelector } from "../redux/store.hooks";
import { getCartProducts, getTotalPrice } from "../redux/cart.slice";

export const Cart = () => {
  const cartProducts = useAppSelector(getCartProducts);
  const totalPrice = useAppSelector(getTotalPrice);

  return (
    <section className="shopping-cart-container active">
      {cartProducts.length > 0 ? (
        <>
          <div className="products-container">
            <h3 className="title">your foods</h3>

            <div className="box-container">
              {cartProducts.map((p) => (
                <CartBox key={p.id} product={p} />
              ))}
            </div>
          </div>

          <div className="cart-total">
            <h3 className="title"> order total </h3>

            <div className="box">
              <h3 className="subtotal">
                subtotal : <span>${totalPrice}</span>
              </h3>
              <h3 className="total">
                total : <span>${totalPrice + 0.1 * totalPrice}</span>
              </h3>

              <a href="/" className="btn">
                proceed to checkout
              </a>
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
