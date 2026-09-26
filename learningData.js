export const heroSlides = [
  {
    number: "01",
    title: "Build Better Money Habits",
    description: "Learn simple ways to manage your money and make smarter everyday decisions.",
    image: "/images/hero-budget.jpg",
    alt: "Student learning about budgeting"
  },
  {
    number: "02",
    title: "Save With a Goal",
    description: "Set a target, plan your contribution and understand your saving progress.",
    image: "/images/saving-goal.jpg",
    alt: "Saving money and setting a savings goal"
  },
  {
    number: "03",
    title: "Plan Your Spending",
    description: "Organize your sample expenses and understand where your money goes.",
    image: "/images/expense-planner.jpg",
    alt: "Expense planning and money management"
  }
];

export const tickerTips = [
  "💡 Track your small expenses",
  "💰 Save with a purpose",
  "📊 Review your budget regularly",
  "🎯 Set realistic savings goals",
  "🛒 Think before making unnecessary purchases",
  "💡 Track your small expenses",
  "💰 Save with a purpose",
  "📊 Review your budget regularly",
  "🎯 Set realistic savings goals",
  "🛒 Think before making unnecessary purchases"
];

export const quickTips = [
  {
    number: "01",
    title: "Track little expenses",
    description: "Small daily purchases can add up over a month."
  },
  {
    number: "02",
    title: "Save with a purpose",
    description: "Give your savings a goal to stay motivated."
  },
  {
    number: "03",
    title: "Think before buying",
    description: "Give yourself time before making an unnecessary purchase."
  }
];

export const learningItems = [
  {
    id: "income",
    topic: "income",
    icon: "↗",
    title: "Income",
    description: "Money you receive, such as an allowance, scholarship or part-time earnings."
  },
  {
    id: "fixed expenses",
    topic: "fixed expenses",
    icon: "▣",
    title: "Fixed Expenses",
    description: "Regular costs that stay mostly the same, such as monthly transport passes."
  },
  {
    id: "variable expenses",
    topic: "variable expenses",
    icon: "↝",
    title: "Variable Expenses",
    description: "Costs that change, such as eating out, shopping and entertainment."
  },
  {
    id: "needs",
    topic: "needs",
    icon: "⌂",
    title: "Needs",
    description: "Essential things such as food, education and necessary transport."
  },
  {
    id: "wants",
    topic: "wants",
    icon: "☆",
    title: "Wants",
    description: "Optional purchases that can make life enjoyable but are not essential."
  },
  {
    id: "savings",
    topic: "savings",
    icon: "◈",
    title: "Savings",
    description: "Money set aside for future goals or unexpected needs."
  }
];

export const needQuestions = [
  {
    question: "Buying a textbook required for class",
    answer: "need",
    reason: "A required textbook supports your education."
  },
  {
    question: "Buying a new video game",
    answer: "want",
    reason: "A video game is usually an optional purchase."
  },
  {
    question: "Paying for necessary transport to college",
    answer: "need",
    reason: "Necessary transport helps you attend your classes."
  },
  {
    question: "Buying an extra pair of fashionable shoes",
    answer: "want",
    reason: "Extra fashionable shoes are generally optional."
  }
];

export const commonMistakes = [
  {
    summary: "Impulse buying",
    details: "You see a discounted pair of shoes and buy them without checking your budget. Try waiting 24 hours before making an optional purchase."
  },
  {
    summary: "Ignoring small expenses",
    details: "Buying snacks every day may seem inexpensive, but the monthly total can surprise you. Track even small purchases."
  },
  {
    summary: "Late payments",
    details: "Forgetting a bill can lead to extra charges. Keep a reminder for important payment dates."
  },
  {
    summary: "Unused subscriptions",
    details: "Paying for services you rarely use wastes money. Review your subscriptions regularly."
  },
  {
    summary: "Spending without a plan",
    details: "Using money without setting priorities can leave little for important needs. Create a simple monthly budget first."
  }
];

export const galleryCards = [
  {
    id: 1,
    category: "budget",
    image: "/images/hero-budget.jpg",
    alt: "Student budgeting and planning money",
    title: "The budget split",
    description: "A simple way to organize needs, wants and savings."
  },
  {
    id: 2,
    category: "budget",
    image: "/images/budgeting-student.jpg",
    alt: "Student learning budgeting basics",
    title: "Choose wisely",
    description: "Learn how to prioritize essential purchases."
  },
  {
    id: 3,
    category: "saving",
    image: "/images/saving-goal.jpg",
    alt: "Savings goal and money planning",
    title: "Small saving challenge",
    description: "Practice putting aside a little money regularly."
  }
];

export function getChatAnswer(question) {
  const text = question.toLowerCase();

  if (text.includes("need")) {
    return "A need is something essential, such as food, education or necessary transport.";
  }

  if (text.includes("want")) {
    return "A want is something optional, such as entertainment or an extra pair of shoes.";
  }

  if (text.includes("save") || text.includes("saving")) {
    return "Try setting a realistic savings goal. The 50-30-20 rule suggests saving 20% as a learning guideline, but your situation may be different.";
  }

  if (text.includes("overspend") || text.includes("spending")) {
    return "Track your expenses, set a spending limit and wait before making unnecessary purchases.";
  }

  if (text.includes("budget")) {
    return "A budget is a plan for your money. Start by listing your income, essential expenses, optional expenses and savings.";
  }

  return "I can help with basic budgeting, saving, needs, wants and overspending. Try asking about one of these topics.";
}
