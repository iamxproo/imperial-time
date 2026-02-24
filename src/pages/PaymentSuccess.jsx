import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const state = location.state;
    if (!state || !state.order) {
      navigate('/');
      return;
    }
    
    setOrderData(state.order);
    
    // Trigger animation after a short delay
    setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
  }, [location, navigate]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-success-container">
      <style>{`
        @keyframes luxuryFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes flowIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="success-content">
        <div className="success-animation">
          <div className="circle"></div>
          <div className="checkmark">✓</div>
        </div>

        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-subtitle">Your luxurious watch is on its way</p>

        <div className="order-card">
          <div className="order-header">
            <h3>Order Confirmation Details</h3>
            <span className="order-id">Order ID: {orderData.orderId}</span>
          </div>

          <div className="order-section">
            <h4>Customer Information</h4>
            <div className="info-row">
              <span className="label">Name</span>
              <span className="value">{orderData.customerDetails?.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Email</span>
              <span className="value">{orderData.customerDetails?.email}</span>
            </div>
            <div className="info-row">
              <span className="label">Phone</span>
              <span className="value">{orderData.customerDetails?.phone}</span>
            </div>
            <div className="info-row">
              <span className="label">Address</span>
              <span className="value">{orderData.customerDetails?.address}</span>
            </div>
          </div>

          <div className="order-section">
            <h4>Order Items</h4>
            <div className="items-list">
              {orderData.items?.map((item, idx) => (
                <div key={idx} className="item-row">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity || 1}</span>
                  </div>
                  <div className="item-price">
                    ₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-section">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{orderData.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%)</span>
              <span>₹{orderData.tax?.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount Paid</span>
              <span>₹{orderData.total?.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="order-section">
            <h4>Payment Details</h4>
            <div className="info-row">
              <span className="label">Payment Method</span>
              <span className="value">UPI</span>
            </div>
            <div className="info-row">
              <span className="label">Status</span>
              <span className="value status-badge success">✓ Completed</span>
            </div>
            <div className="info-row">
              <span className="label">Date & Time</span>
              <span className="value">{orderData.date}</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="primary-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
          <button 
            className="secondary-btn"
            onClick={() => navigate('/account')}
          >
            View Orders
          </button>
        </div>

        <div className="confirmation-message">
          <span className="icon">📧</span>
          <p>A confirmation email has been sent to <strong>{orderData.customerDetails?.email}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
