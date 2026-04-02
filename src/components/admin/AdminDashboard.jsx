import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI, watchAPI, adminWatchAPI } from '../../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [watches, setWatches] = useState([]);
  const [watchesLoading, setWatchesLoading] = useState(false);
  const [editingWatch, setEditingWatch] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [watchMsg, setWatchMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'watches') fetchWatches();
  }, [activeTab]);

  const fetchWatches = async () => {
    setWatchesLoading(true);
    try {
      const data = await watchAPI.getActiveWatches();
      setWatches(data);
    } catch (err) {
      console.error('Error fetching watches:', err);
    } finally {
      setWatchesLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const data = await dashboardAPI.getOverview();
      setDashboard(data);
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

  const handleEditWatch = (watch) => {
    setEditingWatch(watch.id);
    setEditForm({ ...watch });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateWatch = async () => {
    try {
      await adminWatchAPI.updateWatch(editingWatch, editForm);
      setWatchMsg('✅ Watch updated!');
      setEditingWatch(null);
      fetchWatches();
    } catch (err) {
      setWatchMsg('❌ Update failed: ' + err.message);
    }
    setTimeout(() => setWatchMsg(''), 3000);
  };

  const handleToggleStock = async (watch) => {
    try {
      const updated = { ...watch, stock: watch.stock > 0 ? 0 : 10 };
      await adminWatchAPI.updateWatch(watch.id, updated);
      setWatchMsg(`✅ ${watch.name} — ${updated.stock > 0 ? 'In Stock' : 'Out of Stock'}`);
      fetchWatches();
    } catch (err) {
      setWatchMsg('❌ Failed: ' + err.message);
    }
    setTimeout(() => setWatchMsg(''), 3000);
  };

  const handleDeleteWatch = async (watch) => {
    if (!window.confirm(`Delete "${watch.name}"? This cannot be undone.`)) return;
    try {
      await adminWatchAPI.deleteWatch(watch.id);
      setWatchMsg('✅ Watch deleted!');
      fetchWatches();
    } catch (err) {
      setWatchMsg('❌ Delete failed: ' + err.message);
    }
    setTimeout(() => setWatchMsg(''), 3000);
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
          <h1>Imperial Time - Admin</h1>
        </div>
        <div className="nav-tabs">
          <button className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</button>
          <button className={`nav-tab ${activeTab === 'watches' ? 'active' : ''}`} onClick={() => setActiveTab('watches')}>⌚ Watches</button>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      {activeTab === 'dashboard' && (
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
      )}

      {activeTab === 'watches' && (
        <div className="dashboard-container">
          <div className="section">
            <h2>⌚ Watch Management</h2>
            {watchMsg && <div className="watch-msg">{watchMsg}</div>}
            {watchesLoading ? <p>Loading watches...</p> : (
              <div className="orders-table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {watches.map((watch) => (
                      <tr key={watch.id}>
                        <td style={{color:'#1a1a1a'}}>#{watch.id}</td>
                        <td><img src={watch.imageUrl} alt={watch.name} style={{width:'50px',height:'50px',objectFit:'cover',borderRadius:'6px'}} /></td>
                        <td style={{color:'#1a1a1a'}}>
                          {editingWatch === watch.id ? (
                            <input name="name" value={editForm.name} onChange={handleEditChange} style={{width:'140px',padding:'4px',border:'1px solid #ccc',borderRadius:'4px'}} />
                          ) : watch.name}
                        </td>
                        <td style={{color:'#1a1a1a'}}>
                          {editingWatch === watch.id ? (
                            <input name="brand" value={editForm.brand} onChange={handleEditChange} style={{width:'100px',padding:'4px',border:'1px solid #ccc',borderRadius:'4px'}} />
                          ) : watch.brand}
                        </td>
                        <td style={{color:'#1a1a1a'}}>
                          {editingWatch === watch.id ? (
                            <input name="price" type="number" value={editForm.price} onChange={handleEditChange} style={{width:'90px',padding:'4px',border:'1px solid #ccc',borderRadius:'4px'}} />
                          ) : `₹${Number(watch.price).toLocaleString('en-IN')}`}
                        </td>
                        <td style={{color:'#1a1a1a'}}>
                          {editingWatch === watch.id ? (
                            <input name="stock" type="number" value={editForm.stock} onChange={handleEditChange} style={{width:'70px',padding:'4px',border:'1px solid #ccc',borderRadius:'4px'}} />
                          ) : watch.stock}
                        </td>
                        <td>
                          <span style={{
                            padding:'3px 10px', borderRadius:'12px', fontSize:'12px', fontWeight:'600',
                            background: watch.stock > 0 ? '#d4edda' : '#f8d7da',
                            color: watch.stock > 0 ? '#155724' : '#721c24'
                          }}>
                            {watch.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td style={{display:'flex',gap:'6px',flexWrap:'wrap',padding:'10px 8px'}}>
                          {editingWatch === watch.id ? (
                            <>
                              <button onClick={handleUpdateWatch} style={{background:'#28a745',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'4px',cursor:'pointer',fontSize:'12px'}}>💾 Save</button>
                              <button onClick={() => setEditingWatch(null)} style={{background:'#6c757d',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'4px',cursor:'pointer',fontSize:'12px'}}>✕ Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEditWatch(watch)} style={{background:'#c9a84c',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'4px',cursor:'pointer',fontSize:'12px'}}>✏️ Edit</button>
                              <button onClick={() => handleToggleStock(watch)} style={{background: watch.stock > 0 ? '#dc3545' : '#28a745',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'4px',cursor:'pointer',fontSize:'12px'}}>
                                {watch.stock > 0 ? '📦 Out of Stock' : '✅ In Stock'}
                              </button>
                              <button onClick={() => handleDeleteWatch(watch)} style={{background:'#dc3545',color:'#fff',border:'none',padding:'5px 10px',borderRadius:'4px',cursor:'pointer',fontSize:'12px'}}>🗑️ Delete</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

export default AdminDashboard;
