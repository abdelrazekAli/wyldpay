import "../styles/cart.sass";
import { CartBox } from "./CartBox";
import { cartProducts } from "../dummyData";

export const Cart = () => {
  return (
    <section className="shopping-cart-container active">
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
            subtotal : <span>$200</span>
          </h3>
          <h3 className="total">
            total : <span>$200</span>
          </h3>

          <a href="/" className="btn">
            proceed to checkout
          </a>
        </div>
      </div>
    </section>
  );
};
