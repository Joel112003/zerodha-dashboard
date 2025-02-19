import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  // Function to fetch updated holdings
  const fetchHoldings = async () => {
    try {
      // Changed from /addholding to /addholdings to match backend
      const res = await axios.get("https://zerodha-backend-rhaz.onrender.com/addholdings");
      console.log("Holdings Data:", res.data);
      setAllHoldings(res.data || []);
    } catch (error) {
      console.error("Error fetching holdings:", error);
    }
  };

  useEffect(() => {
    fetchHoldings();
    const interval = setInterval(fetchHoldings, 5000);
    return () => clearInterval(interval);
  }, []);

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels: labels.length > 0 ? labels : ["No Data"],
    datasets: [
      {
        label: "Stock Price",
        data: labels.length > 0 ? allHoldings.map((stock) => stock.price) : [0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = (stock.price * stock.qty).toFixed(2);
              const totalCost = (stock.avg * stock.qty).toFixed(2);
              const profitLoss = (curValue - totalCost).toFixed(2);
              const isProfit = parseFloat(profitLoss) >= 0;
              const profClass = isProfit ? "profit" : "loss";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg?.toFixed(2) || "0.00"}</td>
                  <td>{stock.price?.toFixed(2) || "0.00"}</td>
                  <td>{curValue}</td>
                  <td className={profClass}>{profitLoss}</td>
                  <td className={profClass}>{stock.net || "0.00"}</td>
                  <td className={profClass}>{stock.day || "0.00"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {allHoldings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0).toFixed(2)}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {allHoldings.reduce((sum, stock) => sum + stock.price * stock.qty, 0).toFixed(2)}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {(
              allHoldings.reduce((sum, stock) => sum + stock.price * stock.qty, 0) -
              allHoldings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0)
            ).toFixed(2)}
          </h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;