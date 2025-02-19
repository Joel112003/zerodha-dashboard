import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const { addOrder, closeBuyWindow } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBuyClick = async () => {
    try {
      const order = {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
        timestamp: new Date().toLocaleString(),
      };

      await axios.post("https://zerodha-backend-rhaz.onrender.com/newOrder", order);
      addOrder(order); // Add order to context

      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        closeBuyWindow();
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-green" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSuccessModal(false)}>&times;</span>
            <p>Order has been placed successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyActionWindow;
