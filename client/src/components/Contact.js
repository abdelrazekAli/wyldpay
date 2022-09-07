"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
require("../styles/contact.sass");
const Contact = () => {
    return (<section className="contact" id="contact">
      <div className="heading">
        <span>Let's Connect</span>
        <h3>this's all about payfood</h3>
      </div>

      <div className="icons-container">
        <div className="icons">
          <img src="./assets/images/icon-1.png" alt=""/>
          <h3>9:00am to 11:30pm</h3>
        </div>

        <div className="icons">
          <img src="./assets/images/icon-2.png" alt=""/>
          <h3>+49-123-456789</h3>
        </div>

        <div className="icons">
          <img src="./assets/images/icon-3.png" alt=""/>
          <h3>Regensburg, Germany</h3>
        </div>
      </div>
    </section>);
};
exports.Contact = Contact;
