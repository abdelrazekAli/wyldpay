import { Menu } from "../components/Menu";
import { Header } from "../components/Header";
import { Slider } from "../components/Slider";
import { Footer } from "../components/Footer";
import { Contact } from "../components/Contact";
import { About } from "../components/About";

export const Home = () => {
  return (
    <div>
      <Header />
      <Slider />
      <Menu />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};
