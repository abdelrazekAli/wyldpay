export const About = () => {
  return (
    <section className="about" id="about">
      <div className="image display-none">
        <img src="./assets/images/about-img.png" alt="" />
      </div>

      <div className="content">
        <div className="heading d-inline">
          <span>why choose us?</span>
        </div>
        <h3 className="title">what's make our food delicious!</h3>
        <p>
          The most basic way to make your food taste better is to use spices,
          herbs and seasonings to achieve the above purpose.
        </p>
        <p>
          It's all about the smell, the taste, how it looks and how does it
          feel.
        </p>
        <div className="icons-container">
          <div className="icons">
            <img src="./assets/images/serv-1.png" alt="" />
            <h3>fast delivery</h3>
          </div>
          <div className="icons">
            <img src="./assets/images/serv-2.png" alt="" />
            <h3>fresh food</h3>
          </div>
          <div className="icons">
            <img src="./assets/images/serv-3.png" alt="" />
            <h3>best quality</h3>
          </div>
          <div className="icons">
            <img src="./assets/images/serv-4.png" alt="" />
            <h3>24/7 support</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
