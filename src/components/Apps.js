import React, { useState } from 'react';

const Apps= () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (userName) {
      setIsLoggedIn(true);
    } else {
      alert("Please enter your name");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <div className="app-container">
      <main className="app-main">
        <section className="features">
          <h3>App Features</h3>
          <ul>
            <li>Track your funds and transactions</li>
            <li>Manage personal data securely</li>
            <li>Stay updated with real-time notifications</li>
          </ul>
        </section>

        <section className="contact">
          <h3>Contact Support</h3>
          <p>If you need assistance, reach out to our support team at support@app.com</p>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; 20a25 My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Apps;
