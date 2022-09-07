"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const Menu_1 = require("../components/Menu");
const About_1 = require("../components/About");
const Header_1 = require("../components/Header");
const Slider_1 = require("../components/Slider");
const Footer_1 = require("../components/Footer");
const Contact_1 = require("../components/Contact");
const Home = () => {
    return (<div>
      <Header_1.Header />
      <Slider_1.Slider />
      <Menu_1.Menu />
      <About_1.About />
      <Contact_1.Contact />
      <Footer_1.Footer />
    </div>);
};
exports.Home = Home;
