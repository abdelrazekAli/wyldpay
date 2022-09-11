import { Home } from "./pages/user/Home";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/admin/Signup";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
