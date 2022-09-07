import "../styles/slider.sass";
import { useEffect, useRef } from "react";

export const Slider = () => {
  const homeRef = useRef<HTMLDivElement>(null!);
  const imgRef = useRef<HTMLImageElement>(null!);

  // Make movement effect when mouse hover on image
  useEffect(() => {
    homeRef.current.onmousemove = (e) => {
      let x = (window.innerWidth - e.pageX * 2) / 90;
      let y = (window.innerHeight - e.pageY * 2) / 90;

      imgRef.current.style.transform = `translateX(${y}px) translateY(${x}px)`;
    };

    homeRef.current.onmouseleave = () => {
      imgRef.current.style.transform = `translateX(0px) translateY(0px)`;
    };
  });

  return (
    <section className="slider" id="home" ref={homeRef}>
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
        <img src="./assets/images/home-img.png" alt="" className="home-img" />
        <img
          src="./assets/images/home-parallax-img.png"
          alt=""
          className="home-parallax-img"
          ref={imgRef}
        />
      </div>
    </section>
  );
};
