"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Home_1 = require("./pages/Home");
const store_1 = require("./redux/store");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
function App() {
    return (<react_redux_1.Provider store={store_1.store}>
      <react_router_dom_1.BrowserRouter>
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<Home_1.Home />}></react_router_dom_1.Route>
        </react_router_dom_1.Routes>
      </react_router_dom_1.BrowserRouter>
    </react_redux_1.Provider>);
}
exports.default = App;
