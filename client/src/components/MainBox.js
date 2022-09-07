"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainBox = void 0;
const Counters_1 = require("./Counters");
const MainBox = ({ product }) => {
    return (<div className="box">
      <div className="image">
        <img src={`./assets/images/${product.img}`} alt=""/>
      </div>
      <div className="content">
        <h3>{product.name}</h3>
        <div className="price-container">
          <div className="price">${product.price.toFixed(2)}</div>
          <Counters_1.Counters product={product}/>
        </div>
      </div>
    </div>);
};
exports.MainBox = MainBox;
