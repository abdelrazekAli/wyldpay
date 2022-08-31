export const Footer = () => {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>our menu</h3>
          <a href="/">
            <i className="fas fa-arrow-right"></i> pizza
          </a>
          <a href="/">
            <i className="fas fa-arrow-right"></i> burger
          </a>
          <a href="/">
            <i className="fas fa-arrow-right"></i> chicken
          </a>
          <a href="/">
            <i className="fas fa-arrow-right"></i> pasta
          </a>
          <a href="/">
            <i className="fas fa-arrow-right"></i> and more...
          </a>
        </div>

        <div className="box">
          <h3>quick links</h3>
          <a href="/home">
            <i className="fas fa-arrow-right"></i> home
          </a>
          <a href="#offers">
            <i className="fas fa-arrow-right"></i> offers
          </a>
          <a href="#menu">
            <i className="fas fa-arrow-right"></i> menu
          </a>
          <a href="#about">
            <i className="fas fa-arrow-right"></i> about
          </a>
          <a href="#contact">
            <i className="fas fa-arrow-right"></i> contact
          </a>
        </div>

        <div className="box">
          <h3>extra links</h3>
          <a href="/">
            <i className="fas fa-arrow-right"></i> link 1
          </a>
          <a href="/">
            <i className="fas fa-arrow-right"></i> link 2
          </a>
          <a href="/">
            <i className="fas fa-arrow-right"></i> link 3
          </a>
          <a href="/">
            <i className="fas fa-arrow-right"></i> link 4
          </a>
          <a href="/">
            <i className="fas fa-arrow-right"></i> link 5
          </a>
        </div>

        <div className="box">
          <h3>opening hours</h3>
          <p>tuesday : 9:00am to 11:30pm</p>
          <p>wednesday : 9:00am to 11:30pm</p>
          <p>friday : 9:00am to 11:30pm</p>
          <p>saturday : 9:00am to 11:30pm</p>
          <p>sunday and monday closed</p>
        </div>
      </div>

      <div className="bottom">
        <div className="share">
          <a href="/" className="fab fa-facebook-f"></a>
          <a href="/" className="fab fa-twitter"></a>
          <a href="/" className="fab fa-instagram"></a>
          <a href="/" className="fab fa-linkedin"></a>
          <a href="/" className="fab fa-pinterest"></a>
        </div>

        <div className="credit">
          created by <span>brandArtist</span> | all rights reserved!
        </div>
      </div>
    </section>
  );
};
