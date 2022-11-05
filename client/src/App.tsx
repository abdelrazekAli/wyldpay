import "./utils/axiosInterceptor";
import { useEffect } from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getUser } from "./redux/user.slice";
import { checkUser } from "./utils/checkUser";
import { useAppSelector } from "../src/redux/store.hooks";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import pages
import { QR } from "./pages/admin/QR";
import { Home } from "./pages/admin/Home";
import { Login } from "./pages/admin/Login";
import { Signup } from "./pages/admin/Signup";
import { Orders } from "./pages/admin/Orders";
import { Coupons } from "./pages/admin/Coupons";
import { MainMenu } from "./pages/user/MainMenu";
import { Checkout } from "./pages/user/Checkout";
import { EditMenu } from "./pages/admin/EditMenu";
import { EditBank } from "./pages/admin/EditBank";
import { Settings } from "./pages/admin/Settings";
import { ResetPass } from "./pages/admin/ResetPass";
import { ItemDetails } from "./pages/user/ItemDetails";
import { OrderDetails } from "./pages/user/OrderDetails";
import { OrderSuccess } from "./pages/user/OrderSuccess";
import { SendResetPass } from "./pages/admin/SendResetPass";
import { SubscriptionFailed } from "./pages/admin/SubscriptionFailed";
import { SubscriptionSuccess } from "./pages/admin/SubscriptionSuccess";

function AppWraper() {
  const App = () => {
    const user = useAppSelector(getUser);
    useEffect(() => {
      //check if user account is still activated or not
      user && checkUser(user._id);
    }, [user]);

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/menu/:restId/:tableId" element={<MainMenu />} />
          <Route
            path="/menu/:restId/:tableId/item/:itemId"
            element={<ItemDetails />}
          />
          <Route
            path="/menu/:restId/:tableId/order"
            element={<OrderDetails />}
          />
          <Route
            path="/menu/:restId/:tableId/checkout"
            element={<Checkout />}
          />
          <Route path="/orders/:restId/:orderId" element={<OrderSuccess />} />
          <Route path="/admin/send-reset-pass" element={<SendResetPass />} />
          <Route
            path="/admin/subscription-success"
            element={<SubscriptionSuccess />}
          />
          <Route
            path="/admin/subscription-failed"
            element={<SubscriptionFailed />}
          />
          <Route
            path="/admin/reset-pass/:userId/:token"
            element={<ResetPass />}
          />
          {user ? (
            <>
              <Route path="/admin/home" element={<Home />} />
              <Route path="/admin/qr" element={<QR />} />
              <Route path="/admin/bank" element={<EditBank />} />
              <Route path="/admin/menu" element={<EditMenu />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/coupons" element={<Coupons />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/admin/home" replace />} />
            </>
          ) : (
            <>
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/signup/:token" element={<Signup />} />
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
