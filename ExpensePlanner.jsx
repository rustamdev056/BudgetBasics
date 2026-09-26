import React, { useState } from 'react';
import { money, getLocalDate } from '../utils/formatters';

const CATEGORIES = [
  'Food',
  'Transport',
  'Education',
  'Entertainment',
  'Shopping',
  'Utilities',
  'Miscellaneous'
];

export default function ExpensePlanner() {
  const [sampleBudget, setSampleBudget] = useState(0);
  const [budgetInput, setBudgetInput] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form state
  const [date, setDate] = useState(getLocalDate());
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [expenseError, setExpenseError] = useState('');

  // Handle Set Budget
  const handleSetBudget = () => {
    const val = Number(budgetInput);
    if (budgetInput.trim() === '' || !Number.isFinite(val) || val < 0) {
      alert('Please enter a valid sample budget.');
      return;
    }
    setSampleBudget(val);
  };

  // Handle Form Submit (Add or Edit)
  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    setExpenseError('');

    const parsedAmount = Number(amount);
    if (
      !date ||
      !category ||
      !description.trim() ||
      amount.toString().trim() === '' ||
      !Number.isFinite(parsedAmount) ||
      parsedAmount <= 0
    ) {
      setExpenseError('Please fill in all fields with a valid amount.');
      return;
    }

    if (editingId !== null) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                date,
                category,
                description: description.trim(),
                amount: parsedAmount
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newExpense = {
        id: Date.now(),
        date,
        category,
        description: description.trim(),
        amount: parsedAmount
      };
      setExpenses((prev) => [...prev, newExpense]);
    }

    // Reset Form
    setDate(getLocalDate());
    setCategory('');
    setDescription('');
    setAmount('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDate(getLocalDate());
    setCategory('');
    setDescription('');
    setAmount('');
    setExpenseError('');
  };

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setDate(expense.date);
    setCategory(expense.category);
    setDescription(expense.description);
    setAmount(expense.amount);
    setExpenseError('');

    window.scrollTo({
      top: 250,
      behavior: 'smooth'
    });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Delete this expense?')) {
      setExpenses((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) {
        handleCancelEdit();
      }
    }
  };

  // Calculations
  const filteredExpenses = expenses.filter(
    (item) => categoryFilter === 'all' || item.category === categoryFilter
  );

  const totalExpenseAmount = expenses.reduce((sum, item) => sum + item.amount, 0);
  const remainingBalance = sampleBudget - totalExpenseAmount;

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">PLAN BEFORE YOU SPEND</span>
          <h1>Your expense planner.</h1>
          <p>Practice managing a sample monthly budget.</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section container">
        <div className="planner-intro">
          <div className="planner-intro-content">
            <span className="eyebrow">SMART SPENDING</span>
            <h2>Know where your money goes.</h2>
            <p>
              Add sample expenses, organize them by category and see how much of your sample budget
              remains.
            </p>
            <p className="small-note">
              Your planner entries are temporary and are not stored as permanent financial records.
            </p>
          </div>
          <div className="planner-intro-image">
            <img alt="Expense planning and money management" src="/images/expense-planner.jpg" />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="planner-summary">
          <div className="summary-card">
            <span>Sample Budget</span>
            <strong id="budgetDisplay">{money(sampleBudget)}</strong>
          </div>
          <div className="summary-card">
            <span>Planned Expenses</span>
            <strong id="expenseTotal">{money(totalExpenseAmount)}</strong>
          </div>
          <div className="summary-card highlight-card">
            <span>Remaining Balance</span>
            <strong id="remainingBalance">{money(remainingBalance)}</strong>
          </div>
        </div>

        {/* Planner Layout: Form + Table */}
        <div className="planner-layout">
          {/* Form Card */}
          <div className="form-card">
            <h2 id="formTitle">{editingId !== null ? 'Edit expense' : 'Add an expense'}</h2>
            <p>Use sample amounts to practice planning.</p>

            <label htmlFor="sampleBudget">Monthly sample budget (PKR)</label>
            <div className="inline-input">
              <input
                id="sampleBudget"
                min="0"
                placeholder="e.g. 20000"
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
              />
              <button
                className="btn btn-outline"
                id="setBudgetBtn"
                type="button"
                onClick={handleSetBudget}
              >
                Set
              </button>
            </div>

            <form id="expenseForm" onSubmit={handleExpenseSubmit}>
              <label htmlFor="expenseDate">Date</label>
              <input
                id="expenseDate"
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label htmlFor="expenseCategory">Category</label>
              <select
                id="expenseCategory"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label htmlFor="expenseDescription">Description</label>
              <input
                id="expenseDescription"
                placeholder="What are you planning to buy?"
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label htmlFor="expenseAmount">Amount (PKR)</label>
              <input
                id="expenseAmount"
                min="0.01"
                placeholder="Enter amount"
                required
                step="0.01"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              {expenseError && (
                <p className="error" id="expenseError" role="alert">
                  {expenseError}
                </p>
              )}

              <button className="btn btn-primary full-btn" id="saveExpenseBtn" type="submit">
                {editingId !== null ? 'Save Changes' : 'Add Expense'}
              </button>

              {editingId !== null && (
                <button
                  className="text-btn"
                  id="cancelEditBtn"
                  type="button"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          {/* Table Card */}
          <div className="table-card">
            <div className="table-heading">
              <div>
                <h2>Planned expenses</h2>
                <p>Your entries for this session.</p>
              </div>
              <select
                aria-label="Filter by category"
                id="categoryFilter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="expenseTable">
                  {filteredExpenses.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>{money(item.amount)}</td>
                      <td>
                        <button
                          className="table-action"
                          type="button"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="table-action delete-action"
                          type="button"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredExpenses.length === 0 && (
              <p className="empty-message" id="emptyExpenses">
                No expenses yet. Add your first entry!
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
