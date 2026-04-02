import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await adminAPI.login(email, password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUser', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials. Access denied.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <div className="admin-login-wrapper">
        <div className="login-brand-panel">
          <div className="brand-content">
            <div className="brand-logo">
              <span>⌚</span>
            </div>
            <h2 className="brand-name">Imperial Time</h2>
            <p className="brand-tagline">Luxury Watch Management</p>
            <div className="brand-divider"></div>
            <div className="brand-features">
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Real-time Analytics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⌚</span>
                <span>Inventory Control</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🛒</span>
                <span>Order Management</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👥</span>
                <span>Customer Insights</span>
              </div>
            </div>
          </div>
        </div>

        <div className="admin-login-card">
          <div className="card-header">
            <div className="shield-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  fill="rgba(212,175,55,0.1)"/>
                <path d="M9 12L11 14L15 10"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="login-title">Admin Access</h1>
            <p className="login-subtitle">Secure portal — authorized personnel only</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>
                <span className="label-icon">✉</span>
                Admin Email
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <span className="label-icon">🔑</span>
                Password
              </label>
              <div className="input-wrapper password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠</span>
                {error}
              </div>
            )}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Authenticating...
                </span>
              ) : (
                <span>🔓 Access Dashboard</span>
              )}
            </button>
          </form>

          <div className="login-footer">
            <div className="security-badge">
              <span>🔒</span>
              <span>256-bit encrypted · Secure session</span>
            </div>
            <p className="footer-brand">© 2025 Imperial Time Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
