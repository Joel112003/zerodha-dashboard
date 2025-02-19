import React from "react";
import { Link } from "react-router-dom";
import "./Funds.css"

const Funds = () => {
  return (
    <>
      <div className="funds-container">
        <div className="funds-header">
          <p>Instant, zero-cost fund transfers with UPI</p>
          <Link to="/add-funds" className="button button-green">Add funds</Link>
          <Link to="/withdraw" className="button button-blue">Withdraw</Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-column">
          <span className="section-title">
            <p>Equity</p>
          </span>

          <div className="data-table">
            <div className="data-row">
              <p className="data-label">Available margin</p>
              <p className="data-value data-value-highlighted">4,043.10</p>
            </div>
            <div className="data-row">
              <p className="data-label">Used margin</p>
              <p className="data-value">3,757.30</p>
            </div>
            <div className="data-row">
              <p className="data-label">Available cash</p>
              <p className="data-value">4,043.10</p>
            </div>
            
            <div className="divider" />
            
            <div className="data-row">
              <p className="data-label">Opening Balance (Previous Day)</p>
              <p className="data-value">4,043.10</p>
            </div>
            <div className="data-row">
              <p className="data-label">Closing Balance</p>
              <p className="data-value">3,736.40</p>
            </div>
            <div className="data-row">
              <p className="data-label">Payin</p>
              <p className="data-value">4,064.00</p>
            </div>
            <div className="data-row">
              <p className="data-label">SPAN</p>
              <p className="data-value">0.00</p>
            </div>
            <div className="data-row">
              <p className="data-label">Delivery margin</p>
              <p className="data-value">0.00</p>
            </div>
            <div className="data-row">
              <p className="data-label">Exposure</p>
              <p className="data-value">0.00</p>
            </div>
            <div className="data-row">
              <p className="data-label">Options premium</p>
              <p className="data-value">0.00</p>
            </div>
            
            <div className="divider" />
            
            <div className="data-row">
              <p className="data-label">Collateral (Liquid funds)</p>
              <p className="data-value">0.00</p>
            </div>
            <div className="data-row">
              <p className="data-label">Collateral (Equity)</p>
              <p className="data-value">0.00</p>
            </div>
            <div className="data-row">
              <p className="data-label">Total Collateral</p>
              <p className="data-value">0.00</p>
            </div>
          </div>
        </div>

        <div className="dashboard-column">
          <div className="commodity-section">
            <p>You don't have a commodity account</p>
            <Link to="/open-commodity-account" className="button button-blue">
              Open Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;