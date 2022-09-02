import "../styles/menu.sass";
import { MainBox } from "./MainBox";
import { Category } from "./Category";
import { mainProducts } from "../dummyData";

export const Menu = () => {
  // Category filters
  const filteredPizzas = mainProducts.filter((p) => p.category === "pizzas");

  const filteredBurgers = mainProducts.filter((p) => p.category === "burgers");

  const filteredChickens = mainProducts.filter(
    (p) => p.category === "chickens"
  );

  const filteredLunch = mainProducts.filter((p) => p.category === "lunch");

  const filteredDrinks = mainProducts.filter((p) => p.category === "drinks");

  const filteredPopular = mainProducts.filter((p) => p.category === "popular");

  return (
    <div id="menu">
      <div className="heading">
        <span className="fs-4">our menu</span>
      </div>
      <Category />
      <section className="popular mb-3" id="pizzas">
        <div className="heading">
          <h3>pizzas</h3>
        </div>
        <div className="box-container">
          {filteredPizzas.map((p) => (
            <MainBox key={p.id} product={p} />
          ))}
        </div>

        <div className="heading mt-3" id="burgers">
          <h3>burgers</h3>
        </div>
        <div className="box-container">
          {filteredBurgers.map((p) => (
            <MainBox key={p.id} product={p} />
          ))}
        </div>

        <div className="heading mt-3" id="chickens">
          <h3>chickens</h3>
        </div>
        <div className="box-container">
          {filteredChickens.map((p) => (
            <MainBox key={p.id} product={p} />
          ))}
        </div>

        <div className="heading mt-3" id="lunch">
          <h3>lunch</h3>
        </div>
        <div className="box-container">
          {filteredLunch.map((p) => (
            <MainBox key={p.id} product={p} />
          ))}
        </div>

        <div className="heading mt-3" id="drinks">
          <h3>drinks</h3>
        </div>
        <div className="box-container">
          {filteredDrinks.map((p) => (
            <MainBox key={p.id} product={p} />
          ))}
        </div>

        <div className="heading mt-3" id="popular">
          <h3>our popular foods</h3>
        </div>
        <div className="box-container">
          {filteredPopular.map((p) => (
            <MainBox key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* <section className="banner" id="offers">
        <div className="heading pb-0">
          <h3>our special offers</h3>
        </div>
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
      </section> */}

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
