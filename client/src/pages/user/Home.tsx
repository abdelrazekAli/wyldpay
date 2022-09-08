import { Menu } from "../../components/user/Menu";
import { About } from "../../components/user/About";
import { Header } from "../../components/user/Header";
import { Slider } from "../../components/user/Slider";
import { Footer } from "../../components/user/Footer";
import { Contact } from "../../components/user/Contact";

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
