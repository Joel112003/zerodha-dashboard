import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://zerodha-backend-rhaz.onrender.com/getOrders");
      console.log("Fetched orders:", response.data);
      setOrders(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError("Failed to load orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 100000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchOrders} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-list-section">
        <h2 className="orders-title">Your Orders</h2>
        
        {!orders || orders.length === 0 ? (
          <div className="empty-orders">
            <p>No orders found</p>
            <Link to="/" className="get-started-btn">
              Place New Order
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <div
                key={order._id || index}
                className={`order-card ${order.mode?.toLowerCase() || ""}`}
              >
                <div className="order-header">
                  <span className="order-number">Order #{index + 1}</span>
                  <span className={`order-status ${order.approved ? "approved" : "pending"}`}>
                    {order.approved ? "✅ Approved" : "⏳ Pending"}
                  </span>
                </div>

                <div className="order-details">
                  <div className="detail-row">
                    <span className="label">Name:</span>
                    <span className="value">{order.name || "N/A"}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Quantity:</span>
                    <span className="value">{order.qty || "N/A"}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Mode:</span>
                    <span className="value">{order.mode || "N/A"}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Price:</span>
                    <span className="value">₹{order.price?.toFixed(2) || "0.00"}</span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span className="value">
                      {order.createdAt 
                        ? new Date(order.createdAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;