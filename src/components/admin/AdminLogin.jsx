import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 12).toUpperCase());
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
      setAttempts(prev => prev + 1);
      setError('Authentication failed. Invalid credentials or insufficient privileges.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

  return (
    <div className="al-page">
      {/* Scanline overlay */}
      <div className="al-scanlines" />
      {/* Grid background */}
      <div className="al-grid" />

      <div className="al-wrapper">

        {/* ── TOP HEADER BAR ── */}
        <div className="al-topbar">
          <div className="al-topbar-left">
            <span className="al-status-dot" />
            <span className="al-topbar-text">IMPERIAL TIME ENTERPRISE ADMIN PORTAL</span>
          </div>
          <div className="al-topbar-right">
            <span className="al-topbar-text">{formatDate(currentTime)}</span>
            <span className="al-topbar-sep">|</span>
            <span className="al-topbar-clock">{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* ── MAIN CARD ── */}
        <div className="al-card">

          {/* Left panel */}
          <div className="al-left">
            <div className="al-left-inner">
              <div className="al-shield-wrap">
                <svg className="al-shield-svg" viewBox="0 0 64 64" fill="none">
                  <path d="M32 4L8 16V32C8 45.3 18.7 57.4 32 60C45.3 57.4 56 45.3 56 32V16L32 4Z"
                    stroke="#d4af37" strokeWidth="2.5" fill="rgba(212,175,55,0.07)" strokeLinejoin="round"/>
                  <path d="M32 4L8 16V32C8 45.3 18.7 57.4 32 60C45.3 57.4 56 45.3 56 32V16L32 4Z"
                    stroke="url(#shieldGrad)" strokeWidth="1" fill="none" strokeLinejoin="round"/>
                  <path d="M22 32L29 39L42 26" stroke="#d4af37" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="32" cy="32" r="10" stroke="rgba(212,175,55,0.2)" strokeWidth="1" strokeDasharray="3 3"/>
                  <defs>
                    <linearGradient id="shieldGrad" x1="8" y1="4" x2="56" y2="60">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="al-shield-ring al-ring-1" />
                <div className="al-shield-ring al-ring-2" />
              </div>

              <div className="al-brand">
                <p className="al-brand-sub">IMPERIAL TIME</p>
                <h2 className="al-brand-title">ADMIN PANEL</h2>
                <div className="al-brand-line" />
                <p className="al-brand-desc">Restricted Access System</p>
              </div>

              <div className="al-info-rows">
                <div className="al-info-row">
                  <span className="al-info-label">CLEARANCE</span>
                  <span className="al-info-val al-info-val--gold">LEVEL 5 — ADMIN</span>
                </div>
                <div className="al-info-row">
                  <span className="al-info-label">SESSION ID</span>
                  <span className="al-info-val al-info-val--mono">{sessionId}</span>
                </div>
                <div className="al-info-row">
                  <span className="al-info-label">ENCRYPTION</span>
                  <span className="al-info-val">AES-256 · TLS 1.3</span>
                </div>
                <div className="al-info-row">
                  <span className="al-info-label">ENVIRONMENT</span>
                  <span className="al-info-val al-info-val--green">● PRODUCTION</span>
                </div>
              </div>

              <div className="al-warning-box">
                <span className="al-warning-icon">⚠</span>
                <p>Unauthorized access is strictly prohibited and subject to legal action.</p>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="al-right">
            <div className="al-right-top-bar">
              <span className="al-right-tag">SECURE AUTH</span>
              <div className="al-right-dots">
                <span /><span /><span />
              </div>
            </div>

            <div className="al-form-header">
              <h1 className="al-form-title">Administrator Login</h1>
              <p className="al-form-sub">Verify your identity to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="al-form" autoComplete="off">

              <div className="al-field">
                <label className="al-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  ADMIN EMAIL ADDRESS
                </label>
                <div className="al-input-wrap">
                  <input
                    type="email"
                    className="al-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@imperialtime.com"
                    required
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <div className="al-input-corner al-corner-tl" />
                  <div className="al-input-corner al-corner-br" />
                </div>
              </div>

              <div className="al-field">
                <label className="al-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  SECURITY PASSWORD
                </label>
                <div className="al-input-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="al-input al-input--pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="al-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                  <div className="al-input-corner al-corner-tl" />
                  <div className="al-input-corner al-corner-br" />
                </div>
              </div>

              {error && (
                <div className="al-error">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <span>{error}</span>
                  {attempts > 0 && <span className="al-attempts">Attempt {attempts}</span>}
                </div>
              )}

              <button type="submit" className="al-submit-btn" disabled={loading}>
                {loading ? (
                  <span className="al-btn-inner">
                    <span className="al-spinner" />
                    <span>VERIFYING CREDENTIALS...</span>
                  </span>
                ) : (
                  <span className="al-btn-inner">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill="rgba(10,10,15,0.3)"/>
                      <path d="M9 12L11 14L15 10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>AUTHENTICATE &amp; ENTER</span>
                  </span>
                )}
              </button>
            </form>

            <div className="al-footer">
              <div className="al-footer-badges">
                <span className="al-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  ENCRYPTED
                </span>
                <span className="al-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  PROTECTED
                </span>
                <span className="al-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  SESSION TIMED
                </span>
              </div>
              <p className="al-footer-copy">© 2026 Imperial Time · All access is monitored and logged</p>
            </div>
          </div>
        </div>

        {/* ── BOTTOM STATUS BAR ── */}
        <div className="al-bottombar">
          <span className="al-bottombar-item">
            <span className="al-dot al-dot--green" /> SYSTEM ONLINE
          </span>
          <span className="al-bottombar-item">
            <span className="al-dot al-dot--gold" /> SECURE CONNECTION ESTABLISHED
          </span>
          <span className="al-bottombar-item">
            <span className="al-dot al-dot--blue" /> IMPERIAL TIME ADMIN v2.0
          </span>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
