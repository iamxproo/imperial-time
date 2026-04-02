import { useEffect, useState } from 'react';
import { adminWatchAPI, salesAPI, watchAPI } from '../../services/api';

const AdminWatches = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', sku: '', price: 0, stock: 0, active: true, imageUrl: '' });
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchData();
    fetchSales();
  }, []);

  const fetchData = async () => {
    try {
      const data = await watchAPI.getAllWatches();
      setWatches(data);
    } catch (err) {
      console.error('Error fetching watches', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSales = async () => {
    try {
      const data = await salesAPI.getMonthly(6);
      setSales(data);
    } catch (err) {
      console.error('Error fetching sales', err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const handleCreate = async () => {
    try {
      const created = await adminWatchAPI.createWatch({ ...form, price: Number(form.price), stock: Number(form.stock) });
      setWatches([created, ...watches]);
      setForm({ name: '', sku: '', price: 0, stock: 0, active: true, imageUrl: '' });
    } catch (err) {
      console.error('Create failed', err);
    }
  };

  const handleEdit = (w) => {
    setEditing(w.id);
    setForm({ ...w, price: w.price, stock: w.stock });
  };

  const handleUpdate = async () => {
    try {
      const updated = await adminWatchAPI.updateWatch(editing, { ...form, price: Number(form.price), stock: Number(form.stock) });
      setWatches(watches.map(w => (w.id === editing ? updated : w)));
      setEditing(null);
      setForm({ name: '', sku: '', price: 0, stock: 0, active: true, imageUrl: '' });
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this watch?')) return;
    try {
      await adminWatchAPI.deleteWatch(id);
      setWatches(watches.filter(w => w.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="admin-watches">
      <h2>Manage Watches</h2>
      <div className="watch-form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} />
        <label><input name="active" type="checkbox" checked={form.active} onChange={handleChange} /> Active</label>
        {editing ? (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => { setEditing(null); setForm({ name: '', sku: '', price: 0, stock: 0, active: true, imageUrl: '' }); }}>Cancel</button>
          </>
        ) : (
          <button onClick={handleCreate}>Create</button>
        )}
      </div>

      <h3>Sales (Last 6 months)</h3>
      <div className="sales-graph">
        {sales.length === 0 ? <p>No sales data</p> : (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: 150 }}>
            {sales.map((s, idx) => (
              <div key={idx} title={`${s.period}: ₹${s.totalRevenue} (${s.totalOrders} orders)`} style={{ flex: 1 }}>
                <div style={{ background: '#1976d2', height: `${Math.min(100, (s.totalRevenue || 0).toString().length * 8 + 20)}%` }} />
                <div style={{ textAlign: 'center' }}>{s.period}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <h3>Watches</h3>
      {loading ? <p>Loading...</p> : (
        <table className="admin-watches-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Active</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {watches.map(w => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.name}</td>
                <td>₹{w.price}</td>
                <td>{w.stock}</td>
                <td>{w.active ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(w)}>Edit</button>
                  <button onClick={() => handleDelete(w.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminWatches;
