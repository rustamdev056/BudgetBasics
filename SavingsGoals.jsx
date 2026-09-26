import React, { useState } from 'react';
import { money } from '../utils/formatters';

export default function SavingsGoals() {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');

  const [goalError, setGoalError] = useState('');
  const [goalResult, setGoalResult] = useState(null);

  const handleCalculateGoal = (e) => {
    e?.preventDefault();
    setGoalError('');
    setGoalResult(null);

    const name = goalName.trim();
    const target = Number(goalAmount);
    const saved = Number(currentSavings);
    const monthly = Number(monthlyContribution);

    if (
      name === '' ||
      goalAmount.toString().trim() === '' ||
      currentSavings.toString().trim() === '' ||
      monthlyContribution.toString().trim() === ''
    ) {
      setGoalError('Please fill in all fields.');
      return;
    }

    if (!Number.isFinite(target) || !Number.isFinite(saved) || !Number.isFinite(monthly)) {
      setGoalError('Please enter valid numbers.');
      return;
    }

    if (target <= 0) {
      setGoalError('Target amount must be greater than zero.');
      return;
    }

    if (saved < 0) {
      setGoalError('Current savings cannot be negative.');
      return;
    }

    if (monthly <= 0) {
      setGoalError('Monthly contribution must be greater than zero.');
      return;
    }

    if (saved > target) {
      setGoalError('Current savings cannot be greater than the target amount.');
      return;
    }

    const remaining = target - saved;
    let estimatedMonths = 0;
    if (remaining > 0) {
      estimatedMonths = Math.ceil(remaining / monthly);
    }

    const progress = Math.min((saved / target) * 100, 100);

    let timeText = '';
    if (remaining === 0) {
      timeText = 'Goal reached!';
    } else {
      timeText = `${estimatedMonths} ${estimatedMonths === 1 ? 'month' : 'months'}`;
    }

    let tipText = '';
    if (remaining === 0) {
      tipText = 'Great job! You have reached your savings goal.';
    } else if (progress >= 75) {
      tipText = 'You are very close! Keep your monthly saving habit consistent.';
    } else if (progress >= 50) {
      tipText = 'You are halfway there. Stay consistent with your monthly contribution.';
    } else {
      tipText = 'Small, regular contributions can help you move steadily toward your goal.';
    }

    setGoalResult({
      name,
      remaining: money(remaining),
      timeText,
      progress,
      progressText: `${Math.round(progress)}% saved`,
      tipText
    });
  };

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">SAVE FOR SOMETHING</span>
          <h1>Turn a goal into a plan.</h1>
          <p>Choose something you want to save for and see how long it could take.</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section container">
        <div className="goal-intro">
          <div className="goal-intro-content">
            <span className="eyebrow">YOUR SAVINGS GOAL</span>
            <h2>Start with a number.</h2>
            <p>
              Set a savings target, enter what you have already saved, and choose how much you can
              contribute each month.
            </p>
            <div className="example-box">
              <h3>Example</h3>
              <p>
                If your goal is Rs. 24,000, you already have Rs. 4,000, and you save Rs. 2,000 each
                month, you need Rs. 20,000 more and it would take about 10 months.
              </p>
            </div>
          </div>
          <div className="goal-intro-image">
            <img alt="Person planning a savings goal" src="/images/saving-goal.jpg" />
          </div>
        </div>

        {/* Goal Calculator Layout */}
        <div className="calculator-layout">
          <div>
            <span className="eyebrow">PLAN YOUR PROGRESS</span>
            <h2>Build your savings plan.</h2>
            <p>
              Enter your goal details and use the calculator to estimate your remaining amount and
              saving time.
            </p>
            <div className="goal-highlights">
              <div>
                <strong>01</strong>
                <span>Set a target</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Choose a monthly amount</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Track your progress</span>
              </div>
            </div>
          </div>

          <div className="calculator-card">
            <h3>Goal Calculator</h3>
            <form onSubmit={handleCalculateGoal}>
              <label htmlFor="goalName">What are you saving for?</label>
              <input
                id="goalName"
                placeholder="e.g. New laptop"
                type="text"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />

              <label htmlFor="goalAmount">Target amount (PKR)</label>
              <input
                id="goalAmount"
                min="1"
                placeholder="e.g. 60000"
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
              />

              <label htmlFor="currentSavings">Already saved (PKR)</label>
              <input
                id="currentSavings"
                min="0"
                placeholder="e.g. 10000"
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
              />

              <label htmlFor="monthlyContribution">Monthly contribution (PKR)</label>
              <input
                id="monthlyContribution"
                min="1"
                placeholder="e.g. 5000"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
              />

              <button
                className="btn btn-primary full-btn"
                id="goalCalculate"
                type="submit"
              >
                Calculate My Plan
              </button>
            </form>

            {goalError && (
              <p className="error" id="goalError" role="alert">
                {goalError}
              </p>
            )}

            {goalResult && (
              <div id="goalResult">
                <div className="result-line">
                  <span>Goal</span>
                  <strong id="resultGoal">{goalResult.name}</strong>
                </div>
                <div className="result-line">
                  <span>Still needed</span>
                  <strong id="resultRemaining">{goalResult.remaining}</strong>
                </div>
                <div className="result-line">
                  <span>Estimated time</span>
                  <strong id="resultMonths">{goalResult.timeText}</strong>
                </div>

                <div className="goal-progress">
                  <p className="small-note">Savings progress</p>
                  <div className="goal-progress-bar">
                    <div
                      className="goal-progress-fill"
                      id="goalProgressFill"
                      style={{ width: `${goalResult.progress}%` }}
                    />
                  </div>
                  <p className="small-note" id="progressText">
                    {goalResult.progressText}
                  </p>
                </div>

                <div className="goal-tip">
                  <strong>Saving tip:</strong>
                  <p id="goalTip">{goalResult.tipText}</p>
                </div>
              </div>
            )}

            <p className="small-note">
              This calculator provides an educational estimate for learning purposes only.
            </p>
          </div>
        </div>
      </section>

      {/* Smart Saving Tips Section */}
      <section className="section soft-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">SMART SAVING</span>
            <h2>Make saving easier</h2>
            <p>
              Small, consistent steps can help you work towards a clearly defined goal.
            </p>
          </div>
          <div className="card-grid">
            <div className="tip-card">
              <span>01</span>
              <h3>Set a clear target</h3>
              <p>
                A specific goal is easier to work towards than simply saying you want to save
                more.
              </p>
            </div>
            <div className="tip-card">
              <span>02</span>
              <h3>Save regularly</h3>
              <p>
                Even a smaller amount saved consistently can help you move towards a long-term
                goal.
              </p>
            </div>
            <div className="tip-card">
              <span>03</span>
              <h3>Track your progress</h3>
              <p>
                Check your progress regularly and adjust your plan when your circumstances
                change.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
