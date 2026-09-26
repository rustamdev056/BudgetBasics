import React from 'react';
import { Link } from 'react-router-dom';

const SITEMAP_LINKS = [
  {
    to: '/',
    icon: '⌂',
    title: 'Home',
    desc: 'Overview, budgeting introduction, calculator and quick tips.'
  },
  {
    to: '/learn',
    icon: '▤',
    title: 'Learn',
    desc: 'Budgeting lessons, needs vs wants, money mistakes and chatbot.'
  },
  {
    to: '/planner',
    icon: '✓',
    title: 'Expense Planner',
    desc: 'Plan and manage your sample monthly expenses.'
  },
  {
    to: '/goals',
    icon: '☆',
    title: 'Savings Goals',
    desc: 'Calculate how much you could save each month for a goal.'
  },
  {
    to: '/about',
    icon: 'ℹ',
    title: 'About Us',
    desc: 'Learn about BudgetBasics, its purpose and student learning goals.'
  },
  {
    to: '/contact',
    icon: '✉',
    title: 'Contact',
    desc: 'Send feedback and share your thoughts about the website.'
  }
];

export default function Sitemap() {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">SITE MAP</span>
          <h1>Find Your Way Around.</h1>
          <p>All the main sections of BudgetBasics in one place.</p>
        </div>
      </section>

      {/* Explore Section */}
      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">WEBSITE SECTIONS</span>
          <h2>Explore BudgetBasics</h2>
          <p>
            Choose a section below to explore the educational content and interactive tools
            available on the website.
          </p>
        </div>

        <div className="card-grid">
          {SITEMAP_LINKS.map((link) => (
            <Link className="feature-card" key={link.to} to={link.to}>
              <div className="feature-icon">{link.icon}</div>
              <h3>{link.title}</h3>
              <p>{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
