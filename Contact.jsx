import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  const [contactError, setContactError] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactError('');
    setContactSuccess(false);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (
      trimmedName === '' ||
      trimmedEmail === '' ||
      trimmedSubject === '' ||
      rating === '' ||
      trimmedMessage === ''
    ) {
      setContactError('Please fill in all fields.');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setContactError('Please enter a valid email address.');
      return;
    }

    setContactSuccess(true);
    setName('');
    setEmail('');
    setSubject('');
    setRating('');
    setMessage('');
  };

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">WE WOULD LOVE TO HEAR FROM YOU</span>
          <h1>Have some feedback?</h1>
          <p>Tell us what you think about BudgetBasics.</p>
        </div>
      </section>

      {/* Intro & Feedback Section */}
      <section className="section container">
        <div className="contact-intro">
          <div className="contact-intro-content">
            <span className="eyebrow">LET'S CONNECT</span>
            <h2>Your feedback matters.</h2>
            <p>
              Found something useful? Have an idea for improving the website? Send us a
              message and share your thoughts.
            </p>
          </div>
          <div className="contact-intro-image">
            <img alt="Students sharing ideas and feedback" src="/images/contact.jpg" />
          </div>
        </div>

        <div className="calculator-layout">
          <div>
            <div className="example-box">
              <h3>What can you tell us?</h3>
              <p>Share your thoughts about the lessons, tools, design or usability.</p>
            </div>
            <div className="example-box">
              <h3>Contact Information</h3>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:rustamaptech056@gmail.com">rustamaptech056@gmail.com</a>
              </p>
              <p>
                <strong>Phone:</strong> <a href="tel:03442005422">03442005422</a>
              </p>
              <p>
                <strong>Instagram:</strong>{' '}
                <a
                  href="https://www.instagram.com/rustam_ch_56"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @rustam_ch_56
                </a>
              </p>
              <p>
                <strong>TikTok:</strong>{' '}
                <a
                  href="https://www.tiktok.com/@notsyour003"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  @notsyour003
                </a>
              </p>
            </div>
          </div>

          <div className="form-card">
            <h2>Send Feedback</h2>
            <form id="contactForm" onSubmit={handleSubmit}>
              <label htmlFor="contactName">Name</label>
              <input
                id="contactName"
                placeholder="Your name"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label htmlFor="contactEmail">Email</label>
              <input
                id="contactEmail"
                placeholder="you@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="contactSubject">Subject</label>
              <input
                id="contactSubject"
                placeholder="What is your feedback about?"
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <label htmlFor="contactRating">Rating</label>
              <select
                id="contactRating"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select a rating</option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Needs Improvement</option>
                <option value="1">1 - Poor</option>
              </select>

              <label htmlFor="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                placeholder="Write your message..."
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              {contactError && (
                <p className="error" id="contactError" role="alert">
                  {contactError}
                </p>
              )}

              <button className="btn btn-primary full-btn" type="submit">
                Send Feedback
              </button>
            </form>

            {contactSuccess && (
              <div className="example-box" id="contactSuccess">
                <h3>Thank you!</h3>
                <p>
                  Thank you for your feedback. Your response has been received successfully.
                </p>
              </div>
            )}

            <p className="small-note">
              This feedback form is for demonstration purposes. No information is stored or
              transmitted.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
