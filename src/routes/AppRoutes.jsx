import { Route, Routes } from "react-router-dom";

import AdminDashboard from "../components/admin/AdminDashboard";
import AdminLogin from "../components/admin/AdminLogin";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Account from "../pages/Account";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import Collections from "../pages/Collections";
import Home from "../pages/Home";
import OrderSuccess from "../pages/OrderSuccess";
import PaymentSuccess from "../pages/PaymentSuccess";
import Reviews from "../pages/Reviews";
import WatchDetails from "../pages/WatchDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/watch/:id" element={<WatchDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AppRoutes;