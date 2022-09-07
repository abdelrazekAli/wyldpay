"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
require("../styles/slider.sass");
const react_1 = require("react");
const Slider = () => {
    const homeRef = (0, react_1.useRef)(null);
    const imgRef = (0, react_1.useRef)(null);
    // Make movement effect when mouse hover on image
    (0, react_1.useEffect)(() => {
        homeRef.current.onmousemove = (e) => {
            let x = (window.innerWidth - e.pageX * 2) / 90;
            let y = (window.innerHeight - e.pageY * 2) / 90;
            imgRef.current.style.transform = `translateX(${y}px) translateY(${x}px)`;
        };
        homeRef.current.onmouseleave = () => {
            imgRef.current.style.transform = `translateX(0px) translateY(0px)`;
        };
    });
    return (<section className="slider" id="home" ref={homeRef}>
      <div className="content">
        <span>Welcome payfood</span>
        <h3>Different spices for the different tastes 😋</h3>
        <p>
          You can order now and pay direct from the table with highest standards
          of service that help you up in seconds without any efforts.
        </p>
        <a href="#menu" className="btn">
          Order now
        </a>
      </div>

      <div className="image">
        <img src="./assets/images/home-img.png" alt="" className="home-img"/>
        <img src="./assets/images/home-parallax-img.png" alt="" className="home-parallax-img" ref={imgRef}/>
      </div>
    </section>);
};
exports.Slider = Slider;
