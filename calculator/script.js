class Entry {
  constructor(amount, category, date, type) {
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.type = type;
  }

  updateAmount(newAmount) {
    this.amount = newAmount;
  }

  updateCategory(newCategory) {
    this.category = newCategory;
  }
}

class BudgetCalculator {
  constructor() {
    this.entries = [];
  }

  addEntry(amount, category, date, type) {
    const newEntry = new Entry(amount, category, date, type);
    this.entries.push(newEntry);
  }

  calculateBalance() {
    let balance = 0;
    this.entries.forEach((entry) => {
      if (entry.type === "income") {
        balance += entry.amount;
      } else if (entry.type === "expense") {
        balance -= entry.amount;
      }
    });
    return balance;
  }

  displayEntries() {
    console.log("Фінансові записи:");
    this.entries.forEach((entry) => {
      console.log(
        `${entry.date} - ${entry.type === "income" ? "Дохід" : "Витрата"}: ${
          entry.amount
        } грн (Категорія: ${entry.category})`
      );
    });
  }

  filterEntriesByMonth(month) {
    return this.entries.filter(
      (entry) => new Date(entry.date).getMonth() + 1 === month
    );
  }

  filterEntriesByCategory(category) {
    return this.entries.filter((entry) => entry.category === category);
  }
}

// const budget = new BudgetCalculator();

// budget.addEntry(5000, "Зарплата", "2024-10-10", "income");
// budget.addEntry(1500, "Продукти", "2024-10-11", "expense");

// budget.displayEntries();

// console.log(`Загальний баланс: ${budget.calculateBalance()} грн`);

// console.log(
//   "Записи по категорії 'Продукти':",
//   budget.filterEntriesByCategory("Продукти")
// );

// console.log("Жовтень:", budget.filterEntriesByMonth(10));

const budget = new BudgetCalculator();
const entryForm = document.getElementById("entryForm");
const entryList = document.getElementById("entryList");
const balanceElement = document.getElementById("balance");

function updateUI() {
  entryList.innerHTML = "";
  budget.entries.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.date} - ${
      entry.type === "income" ? "Дохід" : "Витрата"
    }: ${entry.amount} грн (Категорія: ${entry.category})`;
    entryList.appendChild(li);
  });

  balanceElement.textContent = budget.calculateBalance();
}

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;

  budget.addEntry(amount, category, date, type);
  updateUI();

  entryForm.reset();
});
