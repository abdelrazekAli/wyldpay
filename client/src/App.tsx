import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import pages
import { Home } from "./pages/user/Home";
import { Login } from "./pages/admin/Login";
import { Signup } from "./pages/admin/Signup";
import { ResetPass } from "./pages/admin/ResetPass";
import { SendResetPass } from "./pages/admin/SendResetPass";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/admin/signup" element={<Signup />}></Route>
          <Route
            path="/admin/reset-pass/:userId/:token"
            element={<ResetPass />}
          ></Route>
          <Route
            path="/admin/send-reset-pass"
            element={<SendResetPass />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
