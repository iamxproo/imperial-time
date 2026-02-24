import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    name: user?.name || "User",
    email: user?.email || "user@example.com",
    phone: user?.phone || "+91 98765 43210",
    address: user?.address || "123 Premium Street, Mumbai, India",
    city: user?.city || "Mumbai",
    zipCode: user?.zipCode || "400001",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);

  const orders = [
    {
      id: "ORD-001",
      date: "2025-02-20",
      items: "Rolex Submariner",
      amount: 1250000,
      status: "Delivered",
    },
    {
      id: "ORD-002",
      date: "2025-02-15",
      items: "Rolex Daytona",
      amount: 1850000,
      status: "In Transit",
    },
    {
      id: "ORD-003",
      date: "2025-02-10",
      items: "Rolex Datejust",
      amount: 950000,
      status: "Processing",
    },
  ];

  const handleSaveProfile = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div className="page-container">
      <h1>My Account</h1>

      {/* Tab Navigation */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          paddingBottom: "20px",
        }}
      >
        {["profile", "orders", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "none",
              border: "none",
              color: activeTab === tab ? "#d4af37" : "#b0b0b0",
              fontSize: "16px",
              fontWeight: activeTab === tab ? "700" : "500",
              cursor: "pointer",
              padding: "10px 0",
              borderBottom: activeTab === tab ? "2px solid #d4af37" : "none",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
              border: "2px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
              padding: "40px",
              marginBottom: "30px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h2 style={{ color: "#d4af37", fontSize: "28px" }}>Profile Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="lux-btn"
                style={{ padding: "10px 20px", fontSize: "12px" }}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {isEditing ? (
              <div style={{ display: "grid", gap: "20px" }}>
                {[
                  { label: "Full Name", name: "name" },
                  { label: "Email", name: "email" },
                  { label: "Phone", name: "phone" },
                  { label: "Address", name: "address" },
                  { label: "City", name: "city" },
                  { label: "Zip Code", name: "zipCode" },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      style={{
                        display: "block",
                        color: "#d4af37",
                        marginBottom: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={editData[field.name]}
                      onChange={handleEditChange}
                      style={{
                        width: "100%",
                        padding: "12px",
                        background: "rgba(42, 42, 42, 0.6)",
                        border: "1px solid rgba(212, 175, 55, 0.3)",
                        color: "white",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                ))}
                <button
                  onClick={handleSaveProfile}
                  className="lux-btn"
                  style={{ marginTop: "20px", width: "100%" }}
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "20px" }}>
                {[
                  { label: "Full Name", value: userData.name },
                  { label: "Email", value: userData.email },
                  { label: "Phone", value: userData.phone },
                  { label: "Address", value: userData.address },
                  { label: "City", value: userData.city },
                  { label: "Zip Code", value: userData.zipCode },
                ].map((field, idx) => (
                  <div key={idx} style={{ display: "grid", gridTemplateColumns: "150px 1fr" }}>
                    <span style={{ color: "#b0b0b0", fontWeight: "500" }}>{field.label}:</span>
                    <span style={{ color: "#ffffff" }}>{field.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
          <h2 style={{ color: "#d4af37", marginBottom: "30px", fontSize: "24px" }}>Order History</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
                  border: "2px solid rgba(212, 175, 55, 0.3)",
                  borderRadius: "8px",
                  padding: "25px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ color: "#b0b0b0", fontSize: "12px", marginBottom: "5px" }}>Order ID</p>
                  <p style={{ color: "#d4af37", fontWeight: "600", fontSize: "16px" }}>{order.id}</p>
                </div>
                <div>
                  <p style={{ color: "#b0b0b0", fontSize: "12px", marginBottom: "5px" }}>Date</p>
                  <p style={{ color: "#ffffff", fontSize: "14px" }}>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p style={{ color: "#b0b0b0", fontSize: "12px", marginBottom: "5px" }}>Amount</p>
                  <p style={{ color: "#d4af37", fontWeight: "600", fontSize: "16px" }}>₹ {order.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p style={{ color: "#b0b0b0", fontSize: "12px", marginBottom: "5px" }}>Status</p>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "6px 16px",
                      background:
                        order.status === "Delivered"
                          ? "rgba(76, 175, 80, 0.2)"
                          : order.status === "In Transit"
                          ? "rgba(33, 150, 243, 0.2)"
                          : "rgba(255, 193, 7, 0.2)",
                      color:
                        order.status === "Delivered"
                          ? "#4CAF50"
                          : order.status === "In Transit"
                          ? "#2196F3"
                          : "#FFC107",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              background: "linear-gradient(135deg, rgba(42, 42, 42, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)",
              border: "2px solid rgba(212, 175, 55, 0.3)",
              borderRadius: "8px",
              padding: "40px",
              marginBottom: "30px",
            }}
          >
            <h2 style={{ color: "#d4af37", marginBottom: "30px", fontSize: "24px" }}>Account Settings</h2>

            {[
              {
                title: "Email Notifications",
                description: "Receive updates about orders and new collections",
              },
              {
                title: "Newsletter",
                description: "Subscribe to our luxury watch newsletter",
              },
              {
                title: "Two-Factor Authentication",
                description: "Enhance your account security",
              },
              {
                title: "Privacy Settings",
                description: "Control how your data is used",
              },
            ].map((setting, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(212, 175, 55, 0.1)",
                }}
              >
                <div>
                  <p style={{ color: "#ffffff", fontWeight: "600", marginBottom: "5px" }}>{setting.title}</p>
                  <p style={{ color: "#b0b0b0", fontSize: "14px" }}>{setting.description}</p>
                </div>
                <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                </label>
              </div>
            ))}

            <button
              onClick={handleLogout}
              className="lux-btn"
              style={{ marginTop: "30px", width: "100%", background: "#d9534f", borderColor: "#d9534f" }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;