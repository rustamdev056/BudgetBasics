import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import TestDataViewer from './components/TestDataViewer';

import Home from './pages/Home';
import Learn from './pages/Learn';
import ExpensePlanner from './pages/ExpensePlanner';
import SavingsGoals from './pages/SavingsGoals';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />

        <Route path="/learn" element={<Learn />} />
        <Route path="/learn.html" element={<Navigate to="/learn" replace />} />

        <Route path="/planner" element={<ExpensePlanner />} />
        <Route path="/planner.html" element={<Navigate to="/planner" replace />} />

        <Route path="/goals" element={<SavingsGoals />} />
        <Route path="/goals.html" element={<Navigate to="/goals" replace />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/contact.html" element={<Navigate to="/contact" replace />} />

        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/sitemap.html" element={<Navigate to="/sitemap" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <BackToTop />
      <TestDataViewer />
    </>
  );
}
