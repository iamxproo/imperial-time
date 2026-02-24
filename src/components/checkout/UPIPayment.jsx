import React from 'react';
import './UPIPayment.css';

const UPIPayment = ({ orderDetails, onPaymentSuccess, onPaymentCancel, loading, total }) => {
  const [upiId, setUpiId] = React.useState('');
  const [showAnimation, setShowAnimation] = React.useState(false);
  const [paymentProcessing, setPaymentProcessing] = React.useState(false);

  const handlePayment = async () => {
    if (!upiId.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/)) {
      alert('Please enter a valid UPI ID (e.g., yourname@upi)');
      return;
    }

    setPaymentProcessing(true);
    setShowAnimation(true);

    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      onPaymentSuccess({
        upiId,
        transactionId: `TXN${Date.now()}`,
        timestamp: new Date().toISOString(),
      });
    }, 3000);
  };

  return (
    <div className="upi-payment-container">
      <style>{`
        @keyframes luxuryGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .upi-payment-container {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>

      {!showAnimation ? (
        <div className="upi-form-card">
          <div className="upi-header">
            <h3>💳 UPI Payment</h3>
            <p className="upi-amount">₹{total?.toLocaleString('en-IN')}</p>
          </div>

          <div className="upi-form">
            <div className="form-group">
              <label className="form-label">Enter Your UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="yourname@upi"
                className="upi-input"
                disabled={paymentProcessing}
              />
              <p className="upi-hint">Format: yourname@bankname (e.g., john@upi, priya@okaxis)</p>
            </div>

            <div className="upi-details">
              <div className="detail-row">
                <span>Subtotal</span>
                <span>₹{orderDetails?.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              <div className="detail-row">
                <span>Tax (18%)</span>
                <span>₹{orderDetails?.tax?.toLocaleString('en-IN')}</span>
              </div>
              <div className="detail-row total">
                <span>Total Amount</span>
                <span>₹{total?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="payment-buttons">
              <button
                onClick={handlePayment}
                disabled={pagmentProcessing || !upiId}
                className="pay-button"
              >
                {paymentProcessing ? 'Processing...' : 'Pay Now'}
              </button>
              <button
                onClick={onPaymentCancel}
                disabled={paymentProcessing}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>

            <div className="security-info">
              🔒 Your payment is secure and encrypted
            </div>
          </div>
        </div>
      ) : (
        <div className="payment-animation">
          <div className="animation-content">
            <div className="checkmark-animation">
              <div className="checkmark">✓</div>
            </div>
            <h2>Processing Payment</h2>
            <p>UPI: {upiId}</p>
            <p className="amount">₹{total?.toLocaleString('en-IN')}</p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UPIPayment;
