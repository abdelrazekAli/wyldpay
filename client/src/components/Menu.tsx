import "../styles/menu.sass";
import { MainBox } from "./MainBox";
import { Category } from "./Category";
import { mainProducts } from "../dummyData";
import { CustomBox } from "./CustomBox";

export const Menu = () => {
  // Category filters
  const filteredPizzas = mainProducts.filter((p) => {
    return p.category === "pizzas";
  });

  const filteredBurgers = mainProducts.filter((p) => {
    return p.category === "burgers";
  });

  const filteredChickens = mainProducts.filter((p) => {
    return p.category === "chickens";
  });

  const filteredLunch = mainProducts.filter((p) => {
    return p.category === "lunch";
  });

  const filteredDrinks = mainProducts.filter((p) => {
    return p.category === "drinks";
  });

  return (
    <div id="menu">
      <div className="heading">
        <span className="fs-4">our menu</span>
      </div>
      <Category />
      <section className="popular" id="popular">
        <div className="heading" id="pizzas">
          <h3>pizzas</h3>
        </div>
        <div className="box-container">
          <CustomBox
            product={{
              id: 25,
              img: "pizza-6.png",
              name: "Greek Pizza",
              price: 25,
              category: "pizzas",
            }}
          />
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
      </section>

      <section className="banner" id="offers">
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
