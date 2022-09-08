import "../../styles/category.sass";

export const Category = () => {
  return (
    <>
      <section className="category">
        <a href="#pizzas" className="box">
          <img src="./assets/images/cat-2.png" alt="" />
          <h3>pizzas</h3>
        </a>

        <a href="#burgers" className="box">
          <img src="./assets/images/cat-3.png" alt="" />
          <h3>burgers</h3>
        </a>

        <a href="#chickens" className="box">
          <img src="./assets/images/cat-4.png" alt="" />
          <h3>chickens</h3>
        </a>

        <a href="#lunch" className="box">
          <img src="./assets/images/cat-5.png" alt="" />
          <h3>lunch</h3>
        </a>

        <a href="#drinks" className="box">
          <img src="./assets/images/cat-6.png" alt="" />
          <h3>drinks</h3>
        </a>
        <a href="#popular" className="box">
          <img src="./assets/images/cat-1.png" alt="" />
          <h3>popular</h3>
        </a>
      </section>
    </>
  );
};
