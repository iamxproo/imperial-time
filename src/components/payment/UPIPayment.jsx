import { useState } from "react";
import "./UPIPayment.css";

const UPIPayment = ({ subtotal, tax, total, onPaymentSuccess, processing }) => {
  const [upiId, setUpiId] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();

    if (!upiId.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/)) {
      alert("Please enter a valid UPI ID (format: example@upi)");
      return;
    }

    setPaymentProcessing(true);

    setTimeout(() => {
      setPaymentProcessing(false);
      
      const paymentData = {
        upiId,
        transactionId: `TXN${Date.now()}`,
        amount: total,
        timestamp: new Date().toISOString()
      };
      
      setUpiId("");
      onPaymentSuccess(paymentData);
    }, 3000);
  };

  if (paymentProcessing) {
    return (
      <div className="payment-animation-container">
        <div className="animation-wrapper">
          <div className="checkmark-circle">
            <svg viewBox="0 0 24 24" className="checkmark-icon">
              <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 12l4 4 8-8" />
            </svg>
          </div>
          <h2 className="animation-title">Processing Payment...</h2>
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p className="animation-subtitle">Please wait while your order is being processed</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="upi-payment-form">
      <div className="form-group">
        <label className="upi-label">UPI ID</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="yourname@upi"
          className="upi-input"
          disabled={processing}
        />
        <p className="upi-hint">💡 Format: yourname@upi or yourname@okhdfcbank</p>
      </div>

      <div className="payment-details">
        <div className="detail-row">
          <span>Subtotal</span>
          <span className="amount">₹ {subtotal.toLocaleString()}</span>
        </div>
        <div className="detail-row">
          <span>Tax (18%)</span>
          <span className="amount">₹ {tax.toLocaleString()}</span>
        </div>
        <div className="detail-row total">
          <span>Total Amount</span>
          <span className="amount">₹ {total.toLocaleString()}</span>
        </div>
      </div>

      <div className="security-notice">
        <p>✓ Your payment is 100% secure</p>
        <p>✓ No card details required</p>
      </div>

      <button
        type="submit"
        disabled={processing || !upiId.trim()}
        className="pay-button"
      >
        {processing ? "Processing..." : `Pay ₹ ${total.toLocaleString()}`}
      </button>

      <p className="payment-method">💳 Secured by UPI Payment Gateway</p>
    </form>
  );
};

export default UPIPayment;
