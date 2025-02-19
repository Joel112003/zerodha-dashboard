import React, { useEffect, useState } from "react";

const Summary = () => {
  const [username, setUsername] = useState("User");
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setUsername(user?.username || "Guest");
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      setUsername("Guest");
    }

    fetch("https://zerodha-backend-rhaz.onrender.com/addholdings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched holdings:", data);
        setHoldings(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching holdings:", error);
        setLoading(false);
      });
  }, []);

  if (loading || holdings.length === 0) {
    return <p>Loading holdings...</p>;
  }

  // Changed buyPrice to avg and marketPrice to price
  const investment = holdings.reduce((sum, stock) => {
    console.log(`Stock: ${stock.name}, Avg: ${stock.avg}, Qty: ${stock.qty}`);
    return sum + stock.qty * stock.avg;
  }, 0);

  const currentValue = holdings.reduce((sum, stock) => {
    console.log(`Stock: ${stock.name}, Price: ${stock.price}, Qty: ${stock.qty}`);
    return sum + stock.qty * stock.price;
  }, 0);

  const pnl = currentValue - investment;
  const pnlPercent = investment > 0 ? ((pnl / investment) * 100).toFixed(2) : "0.00";

  console.log("Investment:", investment);
  console.log("Current Value:", currentValue);
  console.log("P&L:", pnl);
  console.log("P&L %:", pnlPercent);

  return (
    <div className="section">
      <span>
        <p>Equity</p>
      </span>

      <div className="data">
        <div className="first">
          <h3>₹3.74k</h3>
          <p>Margin available</p>
        </div>
        <hr />

        <div className="second">
          <p>Margins used <span>₹0</span></p>
          <p>Opening balance <span>₹3.74k</span></p>
        </div>
      </div>
      <hr className="divider" />

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl < 0 ? "loss" : "profit"}>
              ₹{pnl.toFixed(2)} <small>({pnlPercent}%)</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>Current Value <span>₹{currentValue.toFixed(2)}</span></p>
            <p>Investment <span>₹{investment.toFixed(2)}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </div>
  );
};

export default Summary;