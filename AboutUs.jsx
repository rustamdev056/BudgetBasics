import React from 'react';

export default function AboutUs() {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">ABOUT BUDGETBASICS</span>
          <h1>Learn Today, Budget Better Tomorrow.</h1>
          <p>
            A simple educational platform designed to help students understand budgeting and
            everyday money decisions.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section container">
        <div className="about-intro">
          <div className="about-intro-content">
            <span className="eyebrow">OUR PURPOSE</span>
            <h2>What is BudgetBasics?</h2>
            <p>
              BudgetBasics is an educational website focused on building basic budgeting
              awareness among students.
            </p>
            <p>
              It combines simple lessons, interactive activities and practical educational tools
              to make money management easier to understand.
            </p>
          </div>
          <div className="about-intro-image">
            <img
              alt="Students working together on a budgeting project"
              src="/images/about-team.jpg"
            />
          </div>
        </div>

        <div className="about-grid">
          <article className="info-card">
            <div className="card-icon">💰</div>
            <h3>Understand Budgeting</h3>
            <p>
              Learn the basics of income, expenses, savings, needs, wants and simple budgeting
              rules.
            </p>
          </article>
          <article className="info-card">
            <div className="card-icon">🎯</div>
            <h3>Set Saving Goals</h3>
            <p>
              Use simple educational calculations to understand how regular saving can help you
              reach a target.
            </p>
          </article>
          <article className="info-card">
            <div className="card-icon">📊</div>
            <h3>Plan Your Expenses</h3>
            <p>
              Organize sample expenses and explore how spending decisions can affect a monthly
              budget.
            </p>
          </article>
        </div>
      </section>

      {/* What You Can Learn Section */}
      <section className="section soft-section">
        <div className="container">
          <div className="two-column">
            <div>
              <span className="eyebrow">WHAT YOU CAN LEARN</span>
              <h2>Build Better Money Habits</h2>
              <p>
                BudgetBasics provides simple learning material and interactive tools to make
                budgeting easier to understand.
              </p>
              <ul className="check-list">
                <li>Budgeting basics</li>
                <li>Needs versus wants</li>
                <li>The 50-30-20 budgeting guideline</li>
                <li>Saving goals</li>
                <li>Expense planning</li>
                <li>Common money mistakes</li>
              </ul>
            </div>
            <div className="highlight-card">
              <span className="highlight-number">01</span>
              <h3>Learn</h3>
              <p>
                Understand basic financial concepts through simple examples and interactive
                activities.
              </p>
              <span className="highlight-number">02</span>
              <h3>Practice</h3>
              <p>
                Use calculators, quizzes and planning tools to apply what you learn.
              </p>
              <span className="highlight-number">03</span>
              <h3>Improve</h3>
              <p>
                Identify common spending mistakes and develop better budgeting awareness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="section container">
        <div className="section-heading">
          <span className="eyebrow">OUR TEAM</span>
          <h2>Created for Student Learning</h2>
          <p>BudgetBasics is designed as a student-focused educational project.</p>
        </div>
        <div className="team-card">
          <div className="team-avatar">BB</div>
          <div>
            <h3>BudgetBasics Team</h3>
            <p>
              A student project focused on making budgeting concepts simple, understandable and
              interactive.
            </p>
            <p>
              The project combines educational content, calculators, quizzes and planning
              tools in one responsive website.
            </p>
          </div>
        </div>
      </section>

      {/* Notice Card Section */}
      <section className="section soft-section">
        <div className="container">
          <div className="notice-card">
            <h2>Educational Information Only</h2>
            <p>
              BudgetBasics provides basic educational information about budgeting and saving.
              The calculators and examples are intended for learning purposes only.
            </p>
            <p>
              The information provided by this website should not be considered professional
              financial advice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
