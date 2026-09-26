import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [visitorCount, setVisitorCount] = useState(1);

  useEffect(() => {
    // Initialize & update clock
    const updateClock = () => {
      setCurrentDateTime(new Date().toLocaleString());
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);

    // Visitor counter
    try {
      let visits = Number(localStorage.getItem('budgetBasicsVisits') || 0);
      visits++;
      localStorage.setItem('budgetBasicsVisits', visits);
      setVisitorCount(visits);
    } catch {
      setVisitorCount(1);
    }

    return () => clearInterval(timer);
  }, []);

  return (
    <footer>
      <div className="container footer-content">
        <div>
          <Link className="logo" to="/">
            Budget<span>Basics</span>
          </Link>
          <p>Helping students make smarter money decisions.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/planner">Planner</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
        <div className="footer-info">
          <p id="dateTime">{currentDateTime}</p>
          <p>
            Visits on this browser: <span id="visitorCount">{visitorCount}</span>
          </p>
        </div>
      </div>
      <p className="copyright">© 2026 BudgetBasics. Educational purposes only.</p>
    </footer>
  );
}
