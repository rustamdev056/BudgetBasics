const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });
}

const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", function () {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const dateTime = document.getElementById("dateTime");

if (dateTime) {
    function updateClock() {
        dateTime.textContent = new Date().toLocaleString();
    }

    updateClock();
    setInterval(updateClock, 1000);

    let visits = Number(
        localStorage.getItem("budgetBasicsVisits") || 0
    );

    visits++;

    localStorage.setItem("budgetBasicsVisits", visits);

    const visitorCount = document.getElementById("visitorCount");

    if (visitorCount) {
        visitorCount.textContent = visits;
    }
}

function money(amount) {
    return "Rs. " + Number(amount).toLocaleString("en-PK", {
        maximumFractionDigits: 2
    });
}

const calculateBtn = document.getElementById("calculateBtn");

if (calculateBtn) {
    calculateBtn.addEventListener("click", function () {
        const input = document.getElementById("monthlyIncome");
        const amount = Number(input.value);
        const error = document.getElementById("calculatorError");
        const result = document.getElementById("calculatorResult");

        error.textContent = "";
        result.classList.add("hidden");

        if (
            input.value.trim() === "" ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            error.textContent =
                "Please enter a valid income greater than zero.";
            return;
        }

        document.getElementById("needsResult").textContent =
            money(amount * 0.5);

        document.getElementById("wantsResult").textContent =
            money(amount * 0.3);

        document.getElementById("savingsResult").textContent =
            money(amount * 0.2);

        result.classList.remove("hidden");
    });
}

const lessonSearch = document.getElementById("lessonSearch");

if (lessonSearch) {
    lessonSearch.addEventListener("input", function () {
        const search = lessonSearch.value.toLowerCase().trim();
        const items = document.querySelectorAll(".learning-item");
        let matches = 0;

        items.forEach(function (item) {
            const text = item.textContent.toLowerCase();

            if (text.includes(search)) {
                item.classList.remove("hidden");
                matches++;
            } else {
                item.classList.add("hidden");
            }
        });

        const noLessons = document.getElementById("noLessons");

        if (noLessons) {
            noLessons.classList.toggle("hidden", matches > 0);
        }
    });
}

const lessonSort = document.getElementById("lessonSort");
const learningGrid = document.querySelector(".learning-grid");

if (lessonSort && learningGrid) {
    lessonSort.addEventListener("change", function () {
        const lessons = Array.from(
            learningGrid.querySelectorAll(".learning-item")
        );

        if (this.value === "az") {
            lessons.sort(function (a, b) {
                const titleA = a.querySelector("h3").textContent.trim();
                const titleB = b.querySelector("h3").textContent.trim();

                return titleA.localeCompare(titleB);
            });
        }

        if (this.value === "za") {
            lessons.sort(function (a, b) {
                const titleA = a.querySelector("h3").textContent.trim();
                const titleB = b.querySelector("h3").textContent.trim();

                return titleB.localeCompare(titleA);
            });
        }

        lessons.forEach(function (lesson) {
            learningGrid.appendChild(lesson);
        });
    });
}

const answerButtons = document.querySelectorAll(".answer-btn");

if (answerButtons.length > 0) {
    answerButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const feedback =
                document.getElementById("quizFeedback");

            if (!feedback) {
                return;
            }

            if (button.dataset.correct === "true") {
                feedback.textContent =
                    "Correct! A monthly bus pass is a regular fixed expense.";

                feedback.style.color = "green";
            } else {
                feedback.textContent =
                    "Not quite. Snacks and shopping can vary each month.";

                feedback.style.color = "#ba3e3e";
            }
        });
    });
}

const needQuestions = [
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

let currentQuestion = 0;

function checkNeed(answer) {
    const feedback = document.getElementById("needFeedback");

    if (!feedback) {
        return;
    }

    const question = needQuestions[currentQuestion];

    if (answer === question.answer) {
        feedback.textContent =
            "Correct! " + question.reason;

        feedback.style.color = "green";
    } else {
        feedback.textContent =
            "Try again. " + question.reason;

        feedback.style.color = "#ba3e3e";
    }
}

function nextQuestion() {
    const itemQuestion = document.getElementById("itemQuestion");
    const needFeedback = document.getElementById("needFeedback");

    if (!itemQuestion || !needFeedback) {
        return;
    }

    currentQuestion =
        (currentQuestion + 1) % needQuestions.length;

    itemQuestion.textContent =
        needQuestions[currentQuestion].question;

    needFeedback.textContent = "";
}

const filterButtons = document.querySelectorAll(".filter-btn");

if (filterButtons.length > 0) {
    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const category = button.dataset.filter;
            let matches = 0;

            filterButtons.forEach(function (item) {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            document
                .querySelectorAll(".gallery-card")
                .forEach(function (card) {
                    const show =
                        category === "all" ||
                        card.dataset.category === category;

                    card.classList.toggle("hidden", !show);

                    if (show) {
                        matches++;
                    }
                });

            const galleryEmpty =
                document.getElementById("galleryEmpty");

            if (galleryEmpty) {
                galleryEmpty.classList.toggle(
                    "hidden",
                    matches > 0
                );
            }
        });
    });
}

const chatForm = document.getElementById("chatForm");

function addChatMessage(message, className) {
    const box = document.getElementById("chatMessages");

    if (!box) {
        return;
    }

    const div = document.createElement("div");

    div.className = className;
    div.textContent = message;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

function getChatAnswer(question) {
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

    if (
        text.includes("overspend") ||
        text.includes("spending")
    ) {
        return "Track your expenses, set a spending limit and wait before making unnecessary purchases.";
    }

    if (text.includes("budget")) {
        return "A budget is a plan for your money. Start by listing your income, essential expenses, optional expenses and savings.";
    }

    return "I can help with basic budgeting, saving, needs, wants and overspending. Try asking about one of these topics.";
}

function askSuggested(question) {
    const chatInput = document.getElementById("chatInput");

    if (!chatInput) {
        return;
    }

    chatInput.value = question;
    sendChatMessage();
}

function sendChatMessage() {
    const input = document.getElementById("chatInput");

    if (!input) {
        return;
    }

    const question = input.value.trim();

    if (question === "") {
        return;
    }

    addChatMessage(question, "user-message");
    addChatMessage(getChatAnswer(question), "bot-message");

    input.value = "";
}

if (chatForm) {
    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sendChatMessage();
    });
}

function getLocalDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
}

const expenseForm = document.getElementById("expenseForm");

if (expenseForm) {
    let expenses = [];
    let sampleBudget = 0;
    let editingId = null;
    let nextId = 1;

    const expenseDate =
        document.getElementById("expenseDate");

    if (expenseDate) {
        expenseDate.value = getLocalDate();
    }

    const setBudgetBtn =
        document.getElementById("setBudgetBtn");

    if (setBudgetBtn) {
        setBudgetBtn.addEventListener("click", function () {
            const input =
                document.getElementById("sampleBudget");

            const amount = Number(input.value);

            if (
                input.value.trim() === "" ||
                !Number.isFinite(amount) ||
                amount < 0
            ) {
                alert("Please enter a valid sample budget.");
                return;
            }

            sampleBudget = amount;
            renderExpenses();
        });
    }

    expenseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const date = expenseDate.value;

        const category =
            document.getElementById("expenseCategory").value;

        const description =
            document
                .getElementById("expenseDescription")
                .value
                .trim();

        const amountInput =
            document.getElementById("expenseAmount");

        const amount = Number(amountInput.value);

        const error =
            document.getElementById("expenseError");

        error.textContent = "";

        if (
            !date ||
            !category ||
            !description ||
            amountInput.value.trim() === "" ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {
            error.textContent =
                "Please fill in all fields with a valid amount.";
            return;
        }

        if (editingId !== null) {
            const expense = expenses.find(function (item) {
                return item.id === editingId;
            });

            if (expense) {
                expense.date = date;
                expense.category = category;
                expense.description = description;
                expense.amount = amount;
            }

            editingId = null;
        } else {
            expenses.push({
                id: nextId++,
                date: date,
                category: category,
                description: description,
                amount: amount
            });
        }

        expenseForm.reset();

        expenseDate.value = getLocalDate();

        document.getElementById("formTitle").textContent =
            "Add an expense";

        document.getElementById("saveExpenseBtn").textContent =
            "Add Expense";

        document
            .getElementById("cancelEditBtn")
            .classList.add("hidden");

        renderExpenses();
    });

    const cancelEditBtn =
        document.getElementById("cancelEditBtn");

    if (cancelEditBtn) {
        cancelEditBtn.addEventListener("click", function () {
            editingId = null;

            expenseForm.reset();

            expenseDate.value = getLocalDate();

            document.getElementById("formTitle").textContent =
                "Add an expense";

            document.getElementById("saveExpenseBtn").textContent =
                "Add Expense";

            this.classList.add("hidden");
        });
    }

    const categoryFilter =
        document.getElementById("categoryFilter");

    if (categoryFilter) {
        categoryFilter.addEventListener(
            "change",
            renderExpenses
        );
    }

    function renderExpenses() {
        const table =
            document.getElementById("expenseTable");

        const filter =
            document.getElementById("categoryFilter").value;

        const visible = expenses.filter(function (item) {
            return (
                filter === "all" ||
                item.category === filter
            );
        });

        table.innerHTML = "";

        visible.forEach(function (expense) {
            const row = document.createElement("tr");

            [
                expense.date,
                expense.category,
                expense.description,
                money(expense.amount)
            ].forEach(function (value) {
                const cell = document.createElement("td");

                cell.textContent = value;
                row.appendChild(cell);
            });

            const actions =
                document.createElement("td");

            const editBtn =
                document.createElement("button");

            const deleteBtn =
                document.createElement("button");

            editBtn.textContent = "Edit";
            editBtn.className = "table-action";

            editBtn.addEventListener("click", function () {
                editingId = expense.id;

                expenseDate.value = expense.date;

                document.getElementById(
                    "expenseCategory"
                ).value = expense.category;

                document.getElementById(
                    "expenseDescription"
                ).value = expense.description;

                document.getElementById(
                    "expenseAmount"
                ).value = expense.amount;

                document.getElementById(
                    "formTitle"
                ).textContent = "Edit expense";

                document.getElementById(
                    "saveExpenseBtn"
                ).textContent = "Save Changes";

                document.getElementById(
                    "cancelEditBtn"
                ).classList.remove("hidden");

                window.scrollTo({
                    top: 250,
                    behavior: "smooth"
                });
            });

            deleteBtn.textContent = "Delete";
            deleteBtn.className =
                "table-action delete-action";

            deleteBtn.addEventListener("click", function () {
                if (confirm("Delete this expense?")) {
                    expenses = expenses.filter(
                        function (item) {
                            return item.id !== expense.id;
                        }
                    );

                    renderExpenses();
                }
            });

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            row.appendChild(actions);
            table.appendChild(row);
        });

        const total = expenses.reduce(
            function (sum, item) {
                return sum + item.amount;
            },
            0
        );

        document.getElementById("budgetDisplay").textContent =
            money(sampleBudget);

        document.getElementById("expenseTotal").textContent =
            money(total);

        document.getElementById("remainingBalance").textContent =
            money(sampleBudget - total);

        document.getElementById("emptyExpenses").classList.toggle(
            "hidden",
            visible.length > 0
        );
    }

    renderExpenses();
}

const goalCalculate =
    document.getElementById("goalCalculate");

if (goalCalculate) {
    goalCalculate.addEventListener("click", function () {
        const goalNameInput =
            document.getElementById("goalName");

        const goalAmountInput =
            document.getElementById("goalAmount");

        const currentSavingsInput =
            document.getElementById("currentSavings");

        const monthlyContributionInput =
            document.getElementById("monthlyContribution");

        const goalError =
            document.getElementById("goalError");

        const goalResult =
            document.getElementById("goalResult");

        const goalName =
            goalNameInput.value.trim();

        const goalAmount =
            Number(goalAmountInput.value);

        const currentSavings =
            Number(currentSavingsInput.value);

        const monthlyContribution =
            Number(monthlyContributionInput.value);

        goalError.textContent = "";
        goalResult.classList.add("hidden");

        if (
            goalName === "" ||
            goalAmountInput.value.trim() === "" ||
            currentSavingsInput.value.trim() === "" ||
            monthlyContributionInput.value.trim() === ""
        ) {
            goalError.textContent =
                "Please fill in all fields.";
            return;
        }

        if (
            !Number.isFinite(goalAmount) ||
            !Number.isFinite(currentSavings) ||
            !Number.isFinite(monthlyContribution)
        ) {
            goalError.textContent =
                "Please enter valid numbers.";
            return;
        }

        if (goalAmount <= 0) {
            goalError.textContent =
                "Target amount must be greater than zero.";
            return;
        }

        if (currentSavings < 0) {
            goalError.textContent =
                "Current savings cannot be negative.";
            return;
        }

        if (monthlyContribution <= 0) {
            goalError.textContent =
                "Monthly contribution must be greater than zero.";
            return;
        }

        if (currentSavings > goalAmount) {
            goalError.textContent =
                "Current savings cannot be greater than the target amount.";
            return;
        }

        const remaining =
            goalAmount - currentSavings;

        let estimatedMonths = 0;

        if (remaining > 0) {
            estimatedMonths =
                Math.ceil(
                    remaining / monthlyContribution
                );
        }

        const progress = Math.min(
            (currentSavings / goalAmount) * 100,
            100
        );

        const resultGoal =
            document.getElementById("resultGoal");

        const resultRemaining =
            document.getElementById("resultRemaining");

        const resultMonths =
            document.getElementById("resultMonths");

        if (resultGoal) {
            resultGoal.textContent = goalName;
        }

        if (resultRemaining) {
            resultRemaining.textContent =
                money(remaining);
        }

        if (resultMonths) {
            if (remaining === 0) {
                resultMonths.textContent =
                    "Goal reached!";
            } else {
                resultMonths.textContent =
                    estimatedMonths +
                    (estimatedMonths === 1
                        ? " month"
                        : " months");
            }
        }

        const progressFill =
            document.getElementById("goalProgressFill");

        const progressText =
            document.getElementById("progressText");

        if (progressFill) {
            progressFill.style.width =
                progress + "%";
        }

        if (progressText) {
            progressText.textContent =
                Math.round(progress) + "% saved";
        }

        const goalTip =
            document.getElementById("goalTip");

        if (goalTip) {
            if (remaining === 0) {
                goalTip.textContent =
                    "Great job! You have reached your savings goal.";
            } else if (progress >= 75) {
                goalTip.textContent =
                    "You are very close! Keep your monthly saving habit consistent.";
            } else if (progress >= 50) {
                goalTip.textContent =
                    "You are halfway there. Stay consistent with your monthly contribution.";
            } else {
                goalTip.textContent =
                    "Small, regular contributions can help you move steadily toward your goal.";
            }
        }

        goalResult.classList.remove("hidden");
    });
}

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name =
            document.getElementById("contactName")
                .value
                .trim();

        const email =
            document.getElementById("contactEmail")
                .value
                .trim();

        const subject =
            document.getElementById("contactSubject")
                .value
                .trim();

        const message =
            document.getElementById("contactMessage")
                .value
                .trim();

        const rating =
            document.getElementById("contactRating").value;

        const error =
            document.getElementById("contactError");

        const success =
            document.getElementById("contactSuccess");

        error.textContent = "";
        success.classList.add("hidden");

        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            rating === "" ||
            message === ""
        ) {
            error.textContent =
                "Please fill in all fields.";
            return;
        }

        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {
            error.textContent =
                "Please enter a valid email address.";
            return;
        }

        success.classList.remove("hidden");
        contactForm.reset();
    });
}

const heroSlider = document.getElementById("heroSlider");

if (heroSlider) {
    const slides = heroSlider.querySelectorAll(".hero-slide");
    const prevBtn = document.getElementById("sliderPrev");
    const nextBtn = document.getElementById("sliderNext");
    const dots = document.querySelectorAll(".slider-dot");

    let currentSlide = 0;
    let sliderTimer;

    function showSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(function (slide, i) {
            slide.classList.toggle(
                "active",
                i === currentSlide
            );
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle(
                "active",
                i === currentSlide
            );
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startSlider() {
        clearInterval(sliderTimer);
        sliderTimer = setInterval(nextSlide, 5000);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            nextSlide();
            startSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            showSlide(currentSlide - 1);
            startSlider();
        });
    }

    dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
            showSlide(Number(dot.dataset.slide));
            startSlider();
        });
    });

    showSlide(0);
    startSlider();
}