import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    } else {
      navigate("/cart");
    }
  }, [location, navigate]);

  if (!order) {
    return <div style={{ padding: "100px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "60px 80px", minHeight: "80vh" }}>
      <style>{`
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .success-animation {
          animation: slideInScale 0.6s ease-out;
        }
      `}</style>

      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        {/* Success Icon */}
        <div className="success-animation" style={{
          fontSize: "80px",
          marginBottom: "30px",
          animation: "slideInScale 0.6s ease-out",
        }}>
          ✅
        </div>

        {/* Success Message */}
        <h1 style={{
          background: "linear-gradient(135deg, #d4af37 0%, #ffffff 50%, #c9a961 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontSize: "48px",
          fontWeight: "700",
          marginBottom: "15px",
          letterSpacing: "2px",
        }}>
          ORDER CONFIRMED!
        </h1>

        <p style={{
          color: "#b0b0b0",
          fontSize: "16px",
          marginBottom: "40px",
        }}>
          Thank you for your purchase. Your luxury timepiece will be delivered soon.
        </p>

        {/* Order Details Card */}
        <div style={{
          background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
          border: "2px solid rgba(212, 175, 55, 0.3)",
          borderRadius: "12px",
          padding: "40px",
          marginBottom: "40px",
          textAlign: "left",
        }}>
          <h2 style={{
            color: "#d4af37",
            marginBottom: "30px",
            fontSize: "20px",
            textAlign: "center",
          }}>
            Order Details
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            marginBottom: "30px",
          }}>
            <div>
              <p style={{ color: "#888", fontSize: "12px", marginBottom: "5px", textTransform: "uppercase" }}>
                Order ID
              </p>
              <p style={{ color: "#d4af37", fontSize: "16px", fontWeight: "700", wordBreak: "break-all" }}>
                {order.orderId}
              </p>
            </div>
            <div>
              <p style={{ color: "#888", fontSize: "12px", marginBottom: "5px", textTransform: "uppercase" }}>
                Payment ID
              </p>
              <p style={{ color: "#d4af37", fontSize: "16px", fontWeight: "700", wordBreak: "break-all" }}>
                {order.razorpayPaymentId}
              </p>
            </div>
            <div>
              <p style={{ color: "#888", fontSize: "12px", marginBottom: "5px", textTransform: "uppercase" }}>
                Date & Time
              </p>
              <p style={{ color: "#b0b0b0", fontSize: "14px" }}>
                {order.date}
              </p>
            </div>
            <div>
              <p style={{ color: "#888", fontSize: "12px", marginBottom: "5px", textTransform: "uppercase" }}>
                Status
              </p>
              <p style={{ color: "#4CAF50", fontSize: "14px", fontWeight: "700" }}>
                ✓ {order.status.toUpperCase()}
              </p>
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(212, 175, 55, 0.2)",
            paddingTop: "30px",
            marginBottom: "30px",
          }}>
            <h3 style={{ color: "#d4af37", marginBottom: "20px", fontSize: "16px" }}>
              Delivery Address
            </h3>
            <div style={{ background: "rgba(10, 10, 10, 0.5)", padding: "15px", borderRadius: "4px" }}>
              <p style={{ color: "#ffffff", marginBottom: "8px", fontWeight: "700" }}>
                {order.customerDetails.name}
              </p>
              <p style={{ color: "#b0b0b0", fontSize: "14px", lineHeight: "1.6" }}>
                {order.customerDetails.address}
              </p>
              <p style={{ color: "#b0b0b0", fontSize: "14px", marginTop: "10px" }}>
                📧 {order.customerDetails.email}<br/>
                📱 {order.customerDetails.phone}
              </p>
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(212, 175, 55, 0.2)",
            paddingTop: "30px",
          }}>
            <h3 style={{ color: "#d4af37", marginBottom: "20px", fontSize: "16px" }}>
              Items Ordered
            </h3>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "12px",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                  marginBottom: "12px",
                }}>
                  <div>
                    <p style={{ color: "#ffffff", marginBottom: "4px" }}>
                      {item.name}
                    </p>
                    <p style={{ color: "#888", fontSize: "12px" }}>
                      Qty: {item.quantity || 1}
                    </p>
                  </div>
                  <p style={{ color: "#d4af37", fontWeight: "700" }}>
                    ₹ {(item.price * (item.quantity || 1)).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(201, 169, 97, 0.05) 100%)",
          border: "1px solid rgba(212, 175, 55, 0.2)",
          borderRadius: "8px",
          padding: "25px",
          marginBottom: "40px",
        }}>
          <div style={{ marginBottom: "15px", paddingBottom: "15px", borderBottom: "1px solid rgba(212, 175, 55, 0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#b0b0b0", marginBottom: "10px" }}>
              <span>Subtotal:</span>
              <span>₹ {order.subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#b0b0b0" }}>
              <span>Tax (18%):</span>
              <span>₹ {Math.round(order.tax).toLocaleString()}</span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", fontWeight: "700", color: "#d4af37" }}>
            <span>Total Paid:</span>
            <span>₹ {Math.round(order.total).toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/collections")}
            style={{
              background: "linear-gradient(135deg, #d4af37 0%, #c9a961 100%)",
              border: "none",
              color: "#0a0a0a",
              padding: "14px 40px",
              fontSize: "14px",
              fontWeight: "700",
              borderRadius: "4px",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 30px rgba(212, 175, 55, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/account")}
            style={{
              background: "transparent",
              border: "2px solid #d4af37",
              color: "#d4af37",
              padding: "12px 40px",
              fontSize: "14px",
              fontWeight: "700",
              borderRadius: "4px",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#d4af37";
              e.target.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#d4af37";
            }}
          >
            View Orders
          </button>
        </div>

        {/* Confirmation Message */}
        <div style={{
          marginTop: "50px",
          padding: "20px",
          background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(56, 142, 60, 0.05) 100%)",
          border: "1px solid rgba(76, 175, 80, 0.2)",
          borderRadius: "8px",
        }}>
          <p style={{ color: "#4CAF50", fontSize: "14px", lineHeight: "1.6" }}>
            ✓ A confirmation email has been sent to <strong>{order.customerDetails.email}</strong><br/>
            ✓ You will receive tracking updates via email and SMS<br/>
            ✓ Your order will be processed within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
