import { Route, Routes } from "react-router-dom";

import AdminDashboard from "../components/admin/AdminDashboard";
import AdminLogin from "../components/admin/AdminLogin";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ConnectionTest from "../components/ConnectionTest";
import { useAuth } from "../context/AuthContext";
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
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Login />} />
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
  <Route path="/admin/dashboard" element={localStorage.getItem('adminToken') ? <AdminDashboard /> : <AdminLogin />} />
      <Route path="/test-connection" element={<ConnectionTest />} />
    </Routes>
  );
};

export default AppRoutes;