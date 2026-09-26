import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <nav className="navbar container">
        <Link className="logo" to="/" onClick={closeMenu}>
          Budget<span>Basics</span>
        </Link>
        <button
          aria-label="Open menu"
          className="menu-btn"
          id="menuBtn"
          type="button"
          onClick={toggleMenu}
        >
          ☰
        </button>
        <div className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/learn"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Learn
          </NavLink>
          <NavLink
            to="/planner"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Expense Planner
          </NavLink>
          <NavLink
            to="/goals"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Savings Goals
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
          <NavLink
            to="/sitemap"
            className={({ isActive }) => (isActive ? 'active' : '')}
            onClick={closeMenu}
          >
            Sitemap
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
