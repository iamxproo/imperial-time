import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/dashboard/overview');
      if (response.ok) {
        const data = await response.json();
        setDashboard(data);
      } else {
        console.error('Failed to fetch dashboard:', response.status);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="admin-dashboard loading">Loading...</div>;
  }

  if (!dashboard) {
    return <div className="admin-dashboard error">Failed to load dashboard</div>;
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-navbar">
        <div className="nav-left">
          <h1>Imperial Time - Admin Dashboard</h1>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Revenue</h3>
            <p className="stat-value">₹{dashboard.totalRevenue?.toLocaleString('en-IN')}</p>
            <span className="stat-label">From completed orders</span>
          </div>

          <div className="stat-card">
            <h3>Total Orders</h3>
            <p className="stat-value">{dashboard.totalOrders}</p>
            <span className="stat-label">All orders</span>
          </div>

          <div className="stat-card">
            <h3>Total Customers</h3>
            <p className="stat-value">{dashboard.totalCustomers}</p>
            <span className="stat-label">Unique customers</span>
          </div>

          <div className="stat-card">
            <h3>Watches Sold</h3>
            <p className="stat-value">{dashboard.totalWatchesSold}</p>
            <span className="stat-label">Total units sold</span>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="section">
            <h2>Recent Orders</h2>
            <div className="orders-table-wrapper">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Items</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.recentOrders?.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">#{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.customerEmail}</td>
                      <td>₹{order.totalAmount?.toLocaleString('en-IN')}</td>
                      <td>{order.itemCount}</td>
                      <td>
                        <span className={`status-badge ${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="section">
            <h2>Loyal Customers (Top 5)</h2>
            <div className="customers-grid">
              {dashboard.loyalCustomers?.map((customer) => (
                <div key={customer.userId} className="customer-card">
                  <div className="customer-header">
                    <h4>{customer.firstName} {customer.lastName}</h4>
                    <span className="customer-badge">{customer.totalOrders} Orders</span>
                  </div>
                  <div className="customer-details">
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phoneNumber || 'N/A'}</p>
                    <p><strong>Total Spent:</strong> ₹{customer.totalSpent?.toLocaleString('en-IN')}</p>
                    <p><strong>Last Order:</strong> {new Date(customer.lastOrderDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
