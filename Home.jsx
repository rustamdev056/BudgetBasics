import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { heroSlides, tickerTips, quickTips } from '../data/learningData';
import { money } from '../utils/formatters';

export default function Home() {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideTimerRef = useRef(null);

  const startSliderTimer = () => {
    clearInterval(slideTimerRef.current);
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  };

  useEffect(() => {
    startSliderTimer();
    return () => clearInterval(slideTimerRef.current);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    startSliderTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    startSliderTimer();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    startSliderTimer();
  };

  // 50-30-20 Calculator state
  const [incomeInput, setIncomeInput] = useState('');
  const [calculatorError, setCalculatorError] = useState('');
  const [calculatorResult, setCalculatorResult] = useState(null);

  const handleCalculate = (e) => {
    e?.preventDefault();
    setCalculatorError('');
    setCalculatorResult(null);

    const amount = Number(incomeInput);
    if (incomeInput.trim() === '' || !Number.isFinite(amount) || amount <= 0) {
      setCalculatorError('Please enter a valid income greater than zero.');
      return;
    }

    setCalculatorResult({
      needs: money(amount * 0.5),
      wants: money(amount * 0.3),
      savings: money(amount * 0.2)
    });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div>
            <span className="eyebrow">YOUR MONEY, YOUR FUTURE</span>
            <h1>
              Small steps.<br />
              <span>Smarter money.</span>
            </h1>
            <p>
              Learn how to manage your money, plan your expenses and build better saving habits.
            </p>
            <div className="hero-buttons">
              <Link className="btn btn-primary" to="/learn">
                Start Learning →
              </Link>
              <Link className="btn btn-outline" to="/planner">
                Try Expense Planner
              </Link>
            </div>
            <div className="hero-note">
              Simple lessons · Practical tools · Made for students
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-slider" id="heroSlider">
              {heroSlides.map((slide, index) => (
                <div
                  key={slide.number}
                  className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <img src={slide.image} alt={slide.alt} />
                  <div className="hero-slide-content">
                    <span>{slide.number}</span>
                    <h2>{slide.title}</h2>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}

              <button
                aria-label="Previous slide"
                className="slider-btn slider-prev"
                id="sliderPrev"
                type="button"
                onClick={prevSlide}
              >
                ‹
              </button>
              <button
                aria-label="Next slide"
                className="slider-btn slider-next"
                id="sliderNext"
                type="button"
                onClick={nextSlide}
              >
                ›
              </button>

              <div aria-label="Slider navigation" className="slider-dots" id="sliderDots">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    data-slide={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
            <div className="floating-note">✦ Your future starts today</div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">LEARN THE BASICS</span>
          <h2>Money skills for everyday life</h2>
          <p>Understand your spending before it controls you.</p>
        </div>
        <div className="card-grid">
          <Link className="feature-card" to="/learn#budgeting">
            <div className="feature-icon">◉</div>
            <h3>Budgeting Basics</h3>
            <p>Learn how income, expenses and savings work together.</p>
            <span>Explore lesson →</span>
          </Link>
          <Link className="feature-card" to="/learn#needs-wants">
            <div className="feature-icon">◇</div>
            <h3>Needs vs Wants</h3>
            <p>Discover the difference between essential and optional spending.</p>
            <span>Explore lesson →</span>
          </Link>
          <Link className="feature-card" to="/planner">
            <div className="feature-icon">▤</div>
            <h3>Expense Planner</h3>
            <p>Practice tracking your expenses with a simple planner.</p>
            <span>Try the planner →</span>
          </Link>
        </div>
      </section>

      {/* 50-30-20 Calculator Section */}
      <section className="section soft-section" id="calculator">
        <div className="container calculator-layout">
          <div>
            <span className="eyebrow">THE 50-30-20 RULE</span>
            <h2>A simple way to split your money</h2>
            <p>Try this popular budgeting guideline using your sample monthly income.</p>
            <div className="rule-list">
              <p>
                <strong>50% Needs</strong> — Food, transport and other essentials.
              </p>
              <p>
                <strong>30% Wants</strong> — Entertainment, shopping and hobbies.
              </p>
              <p>
                <strong>20% Savings</strong> — Future goals and unexpected expenses.
              </p>
            </div>
          </div>
          <div className="calculator-card">
            <h3>Budget Calculator</h3>
            <form onSubmit={handleCalculate}>
              <label htmlFor="monthlyIncome">Monthly income (PKR)</label>
              <input
                id="monthlyIncome"
                min="0"
                placeholder="Enter your income"
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
              />
              <button
                className="btn btn-primary full-btn"
                id="calculateBtn"
                type="submit"
              >
                Calculate Budget
              </button>
            </form>
            {calculatorError && (
              <p className="error" id="calculatorError" role="alert">
                {calculatorError}
              </p>
            )}
            {calculatorResult && (
              <div id="calculatorResult">
                <div className="result-line">
                  <span>Needs (50%)</span>
                  <strong id="needsResult">{calculatorResult.needs}</strong>
                </div>
                <div className="result-line">
                  <span>Wants (30%)</span>
                  <strong id="wantsResult">{calculatorResult.wants}</strong>
                </div>
                <div className="result-line">
                  <span>Savings (20%)</span>
                  <strong id="savingsResult">{calculatorResult.savings}</strong>
                </div>
              </div>
            )}
            <p className="small-note">
              These amounts are educational estimates. Adjust them to your circumstances.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <section className="tips-ticker-section">
        <div className="tips-ticker">
          <div className="tips-ticker-track">
            {tickerTips.map((tip, index) => (
              <span key={index}>{tip}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Money Tips Section */}
      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">QUICK MONEY TIPS</span>
          <h2>Good habits start small</h2>
        </div>
        <div className="card-grid">
          {quickTips.map((tip) => (
            <div className="tip-card" key={tip.number}>
              <span>{tip.number}</span>
              <h3>{tip.title}</h3>
              <p>{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to take control of your money?</h2>
          <p>Start with one lesson and one small change.</p>
          <Link className="btn btn-light" to="/learn">
            Let's Get Started →
          </Link>
        </div>
      </section>
    </main>
  );
}
