import "./utils/axiosInterceptor";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getUser } from "./redux/user.slice";
import { useAppSelector } from "../src/redux/store.hooks";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import admin pages
import {
  QR,
  Home,
  Login,
  Signup,
  Orders,
  Coupons,
  EditMenu,
  EditBank,
  Settings,
  ResetPass,
  SendResetPass,
  SubscriptionFailed,
  SubscriptionSuccess,
} from "./pages/admin";

// Import user pages
import {
  Checkout,
  ItemDetails,
  MainMenu,
  OrderDetails,
  OrderSuccess,
} from "./pages/user";

function AppWraper() {
  const App = () => {
    const user = useAppSelector(getUser);

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
          <Route path="/admin/signup/:token" element={<Signup />} />

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
            <Route path="/admin/login" element={<Login />} />
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
