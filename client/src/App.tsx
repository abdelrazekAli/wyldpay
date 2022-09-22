import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getUser } from "./redux/user.slice";
import { useAppSelector } from "../src/redux/store.hooks";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import pages
import { Home } from "./pages/user/Home";
import { Login } from "./pages/admin/Login";
import { Signup } from "./pages/admin/Signup";
import { Profile } from "./pages/admin/Profile";
import { EditBank } from "./pages/admin/EditBank";
import { Dashboard } from "./pages/admin/Dashboard";
import { ResetPass } from "./pages/admin/ResetPass";
import { SendResetPass } from "./pages/admin/SendResetPass";
import { EditMenu } from "./pages/admin/EditMenu";

function AppWraper() {
  const App = () => {
    const user = useAppSelector(getUser);

    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/reset-pass/:userId/:token"
            element={<ResetPass />}
          />
          <Route path="/admin/send-reset-pass" element={<SendResetPass />} />
          <Route path="/" element={<Home />} />
          {user ? (
            <>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/profile" element={<Profile />} />
              <Route path="/admin/menu" element={<EditMenu />} />
              <Route path="/admin/bank" element={<EditBank />} />
              <Route
                path="*"
                element={<Navigate to="/admin/dashboard" replace />}
              />
            </>
          ) : (
            <>
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/signup" element={<Signup />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  };

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWraper;
