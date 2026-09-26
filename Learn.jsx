import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  learningItems,
  needQuestions,
  commonMistakes,
  galleryCards,
  getChatAnswer
} from '../data/learningData';

export default function Learn() {
  // Lesson 01 state: search & sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const filteredAndSortedLessons = useMemo(() => {
    let result = learningItems.filter((item) => {
      const text = (item.title + ' ' + item.description + ' ' + item.topic).toLowerCase();
      return text.includes(searchTerm.toLowerCase().trim());
    });

    if (sortOrder === 'az') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'za') {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [searchTerm, sortOrder]);

  // Quiz 1 state: Fixed Expense check
  const [quiz1Feedback, setQuiz1Feedback] = useState(null);

  const handleQuiz1Answer = (isCorrect) => {
    if (isCorrect) {
      setQuiz1Feedback({
        text: 'Correct! A monthly bus pass is a regular fixed expense.',
        color: 'green'
      });
    } else {
      setQuiz1Feedback({
        text: 'Not quite. Snacks and shopping can vary each month.',
        color: '#ba3e3e'
      });
    }
  };

  // Quiz 2 state: Need or Want?
  const [needIndex, setNeedIndex] = useState(0);
  const [needFeedback, setNeedFeedback] = useState(null);

  const currentNeedQuestion = needQuestions[needIndex];

  const handleCheckNeed = (answer) => {
    if (answer === currentNeedQuestion.answer) {
      setNeedFeedback({
        text: 'Correct! ' + currentNeedQuestion.reason,
        color: 'green'
      });
    } else {
      setNeedFeedback({
        text: 'Try again. ' + currentNeedQuestion.reason,
        color: '#ba3e3e'
      });
    }
  };

  const handleNextNeedQuestion = () => {
    setNeedIndex((prev) => (prev + 1) % needQuestions.length);
    setNeedFeedback(null);
  };

  // Gallery filter state
  const [galleryFilter, setGalleryFilter] = useState('all');

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'all') return galleryCards;
    return galleryCards.filter((card) => card.category === galleryFilter);
  }, [galleryFilter]);

  // Chatbot state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! What would you like to learn about money today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendChatMessage = (text) => {
    const question = (text || chatInput).trim();
    if (!question) return;

    const answer = getChatAnswer(question);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: question },
      { id: Date.now() + 1, sender: 'bot', text: answer }
    ]);

    setChatInput('');
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    sendChatMessage();
  };

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">YOUR LEARNING SPACE</span>
          <h1>Money made simple.</h1>
          <p>Short lessons, real-life examples and interactive activities.</p>
        </div>
      </section>

      {/* Lesson 01: Budgeting Basics */}
      <section className="section container" id="budgeting">
        <div className="section-heading">
          <span className="eyebrow">LESSON 01</span>
          <h2>Budgeting Basics</h2>
          <p>A budget is a plan for how you will use your money.</p>
        </div>

        <div className="learning-intro-image">
          <img
            alt="Student learning about budgeting and money management"
            src="/images/budgeting-student.jpg"
          />
          <div>
            <h3>Learn how to make smarter money decisions</h3>
            <p>
              Understand income, expenses and savings through simple examples designed for
              everyday student life.
            </p>
          </div>
        </div>

        <input
          aria-label="Search learning content"
          id="lessonSearch"
          placeholder="Search lessons, tips or examples..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="sort-box">
          <label htmlFor="lessonSort">Sort lessons:</label>
          <select
            id="lessonSort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>

        <div className="card-grid learning-grid">
          {filteredAndSortedLessons.map((item) => (
            <div
              className="feature-card learning-item"
              data-topic={item.topic}
              key={item.id}
            >
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        {filteredAndSortedLessons.length === 0 && (
          <p className="empty-message" id="noLessons">
            No matching lessons found.
          </p>
        )}

        <div className="example-box">
          <h3>Example: A student's monthly budget</h3>
          <p>Suppose a student receives Rs. 20,000 per month.</p>
          <div className="result-line">
            <span>Needs</span>
            <strong>Rs. 10,000</strong>
          </div>
          <div className="result-line">
            <span>Wants</span>
            <strong>Rs. 6,000</strong>
          </div>
          <div className="result-line">
            <span>Savings</span>
            <strong>Rs. 4,000</strong>
          </div>
          <p className="small-note">
            These are sample values, not a required spending plan.
          </p>
        </div>

        <div className="quiz-box">
          <h3>Quick knowledge check</h3>
          <p>Which of these is an example of a fixed expense?</p>
          <button
            className="answer-btn"
            data-correct="false"
            type="button"
            onClick={() => handleQuiz1Answer(false)}
          >
            Buying snacks
          </button>
          <button
            className="answer-btn"
            data-correct="true"
            type="button"
            onClick={() => handleQuiz1Answer(true)}
          >
            Monthly bus pass
          </button>
          <button
            className="answer-btn"
            data-correct="false"
            type="button"
            onClick={() => handleQuiz1Answer(false)}
          >
            Weekend shopping
          </button>
          {quiz1Feedback && (
            <p
              aria-live="polite"
              id="quizFeedback"
              style={{ color: quiz1Feedback.color }}
            >
              {quiz1Feedback.text}
            </p>
          )}
        </div>
      </section>

      {/* Lesson 02: Need or Want? */}
      <section className="section soft-section" id="needs-wants">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">LESSON 02</span>
            <h2>Need or want?</h2>
            <p>Choose the right category for each example.</p>
          </div>

          <div className="quiz-box">
            <h3 id="itemQuestion">{currentNeedQuestion.question}</h3>
            <div className="quiz-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleCheckNeed('need')}
              >
                Need
              </button>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => handleCheckNeed('want')}
              >
                Want
              </button>
            </div>
            {needFeedback && (
              <p
                aria-live="polite"
                id="needFeedback"
                style={{ color: needFeedback.color }}
              >
                {needFeedback.text}
              </p>
            )}
            <button
              className="text-btn"
              type="button"
              onClick={handleNextNeedQuestion}
            >
              Next example →
            </button>
          </div>

          <div className="example-box">
            <h3>Before buying something, ask yourself:</h3>
            <p>
              Do I really need it? Can I afford it? Can this purchase wait? Is there a cheaper
              alternative?
            </p>
          </div>
        </div>
      </section>

      {/* Lesson 03: Common Money Mistakes */}
      <section className="section container" id="mistakes">
        <div className="section-heading">
          <span className="eyebrow">LESSON 03</span>
          <h2>Common money mistakes</h2>
          <p>Click each topic to learn how to avoid it.</p>
        </div>

        <div className="mistakes-feature">
          <img
            alt="Money management and healthy financial habits"
            src="/images/money-habits.jpg"
          />
          <div>
            <h3>Build better money habits</h3>
            <p>
              Small decisions can make a difference over time. Learn to recognize common
              spending mistakes and build more thoughtful money habits.
            </p>
          </div>
        </div>

        <div className="accordion">
          {commonMistakes.map((mistake, index) => (
            <details key={index}>
              <summary>{mistake.summary}</summary>
              <p>{mistake.details}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Visual Learning Gallery */}
      <section className="section soft-section" id="gallery">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">VISUAL LEARNING</span>
            <h2>Money lessons at a glance</h2>
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${galleryFilter === 'all' ? 'selected' : ''}`}
              data-filter="all"
              type="button"
              onClick={() => setGalleryFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${galleryFilter === 'budget' ? 'selected' : ''}`}
              data-filter="budget"
              type="button"
              onClick={() => setGalleryFilter('budget')}
            >
              Budgeting
            </button>
            <button
              className={`filter-btn ${galleryFilter === 'saving' ? 'selected' : ''}`}
              data-filter="saving"
              type="button"
              onClick={() => setGalleryFilter('saving')}
            >
              Saving
            </button>
          </div>

          <div className="card-grid" id="galleryItems">
            {filteredGallery.map((item) => (
              <div
                className="gallery-card"
                data-category={item.category}
                key={item.id}
              >
                <img alt={item.alt} className="gallery-image" src={item.image} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          {filteredGallery.length === 0 && (
            <p className="empty-message" id="galleryEmpty">
              No matching items found.
            </p>
          )}
        </div>
      </section>

      {/* Educational Chatbot */}
      <section className="section container" id="chatbot">
        <div className="section-heading">
          <span className="eyebrow">ASK BUDGETBASICS</span>
          <h2>Your money learning assistant</h2>
          <p>Ask a simple question about budgeting, needs or savings.</p>
        </div>

        <div className="chat-box">
          <div className="chat-messages" id="chatMessages" ref={chatMessagesRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="suggested-questions">
            <button
              type="button"
              onClick={() => sendChatMessage('What is a need?')}
            >
              What is a need?
            </button>
            <button
              type="button"
              onClick={() => sendChatMessage('How much should I save?')}
            >
              How much should I save?
            </button>
            <button
              type="button"
              onClick={() => sendChatMessage('How do I avoid overspending?')}
            >
              Avoid overspending
            </button>
          </div>

          <form className="chat-form" id="chatForm" onSubmit={handleChatSubmit}>
            <input
              id="chatInput"
              placeholder="Type your question..."
              required
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Ask
            </button>
          </form>

          <p className="small-note">
            This assistant provides basic educational information, not professional financial
            advice.
          </p>
        </div>
      </section>
    </main>
  );
}
