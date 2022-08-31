import { MainBox } from "./MainBox";
import { mainProducts } from "../dummyData";

export const Menu = () => {
  return (
    <div id="menu">
      <div className="heading">
        <span className="fs-4">our menu</span>
      </div>
      <section className="category">
        <a href="/" className="box">
          <img src="./assets/images/cat-1.png" alt="" />
          <h3>offers</h3>
        </a>

        <a href="/" className="box">
          <img src="./assets/images/cat-2.png" alt="" />
          <h3>pizza</h3>
        </a>

        <a href="/" className="box">
          <img src="./assets/images/cat-3.png" alt="" />
          <h3>burger</h3>
        </a>

        <a href="/" className="box">
          <img src="./assets/images/cat-4.png" alt="" />
          <h3>chicken</h3>
        </a>

        <a href="/" className="box">
          <img src="./assets/images/cat-5.png" alt="" />
          <h3>dinner</h3>
        </a>

        <a href="/" className="box">
          <img src="./assets/images/cat-6.png" alt="" />
          <h3>coffee</h3>
        </a>
      </section>

      <section className="popular" id="popular">
        <div className="heading">
          <h3>our special drinks</h3>
        </div>

        <div className="box-container">
          {mainProducts.map((p) => (
            <MainBox key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="banner" id="offers">
        <div className="row-banner">
          <div className="content">
            <span>double cheese</span>
            <h3>burger</h3>
            <p>with cococola and fries</p>
            <a href="/" className="btn">
              order now
            </a>
          </div>
        </div>

        <div className="grid-banner">
          <div className="grid">
            <img src="./assets/images/banner-1.png" alt="" />
            <div className="content">
              <span>special offer</span>
              <h3>upto 50% off</h3>
              <a href="/" className="btn">
                order now
              </a>
            </div>
          </div>
          <div className="grid">
            <img src="./assets/images/banner-2.png" alt="" />
            <div className="content center">
              <span>special offer</span>
              <h3>upto 25% extra</h3>
              <a href="/" className="btn">
                order now
              </a>
            </div>
          </div>
          <div className="grid">
            <img src="./assets/images/banner-3.png" alt="" />
            <div className="content">
              <span>limited offer</span>
              <h3>100% cashback</h3>
              <a href="/" className="btn">
                order now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="dishes bg-alt" id="menu">
        <div className="heading">
          <span>our menu</span>
          <h3>our top dishes</h3>
        </div>

        <div className="box-container">
          <div className="box">
            <img src="./assets/images/dish-1.png" alt="" />
            <h3>tasty food</h3>

            <span>$15.99</span>
            <a href="/" className="btn">
              add to cart
            </a>
          </div>

          <div className="box">
            <img src="./assets/images/dish-2.png" alt="" />
            <h3>tasty food</h3>

            <span>$15.99</span>
            <a href="/" className="btn">
              add to cart
            </a>
          </div>

          <div className="box">
            <img src="./assets/images/dish-3.png" alt="" />
            <h3>tasty food</h3>

            <span>$15.99</span>
            <a href="/" className="btn">
              add to cart
            </a>
          </div>

          <div className="box">
            <img src="./assets/images/dish-4.png" alt="" />
            <h3>tasty food</h3>

            <span>$15.99</span>
            <a href="/" className="btn">
              add to cart
            </a>
          </div>

          <div className="box">
            <img src="./assets/images/dish-5.png" alt="" />
            <h3>tasty food</h3>

            <span>$15.99</span>
            <a href="/" className="btn">
              add to cart
            </a>
          </div>

          <div className="box">
            <img src="./assets/images/dish-6.png" alt="" />
            <h3>tasty food</h3>

            <span>$15.99</span>
            <a href="/" className="btn">
              add to cart
            </a>
          </div>
        </div>
      </section> */}
    </div>
  );
};
