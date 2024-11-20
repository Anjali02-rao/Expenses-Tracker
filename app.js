const selectCategory = document.querySelector("#select-category");
const inputAmount = document.querySelector("#input-amount");
const inputDate = document.querySelector("#input-date");
const addButton = document.querySelector("#add-button");
const expensesTable = document.querySelector("#expenses-table");
const totalAmountBlock = document.querySelector("#total-amount");

let expenses = [];
let totalAmount = 0;

const saveToLocalStorage = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

const loadFromLocalStorage = () => {
  const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses = storedExpenses;
  totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  totalAmountBlock.textContent = `Total: ${totalAmount}`;
  expenses.forEach((expense) => addExpenseToTable(expense));
};

const addExpenseToTable = (expense) => {
  const newRow = expensesTable.insertRow();
  const categoryCell = newRow.insertCell();
  const AmountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  categoryCell.textContent = expense.category;
  AmountCell.textContent = expense.amount;
  dateCell.textContent = expense.date;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-button");
  deleteCell.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    const rowIndex = Array.from(expensesTable.rows).indexOf(newRow);
    const deletedExpense = expenses[rowIndex];

    expenses.splice(rowIndex, 1);

    totalAmount -= deletedExpense.amount;
    if (expenses.length === 0) {
      totalAmount = 0;
    }
    totalAmountBlock.textContent = `Total: ${totalAmount}`;

    expensesTable.deleteRow(newRow);
    saveToLocalStorage();
  });
};

addButton.addEventListener("click", () => {
  const category = selectCategory.value;
  const amount = Number(inputAmount.value);
  const date = inputDate.value;

  if (category === "") {
    alert("please select your category!");
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert("please select a valid amount!");
    return;
  }
  if (date === "") {
    alert("please select a date!");
    return;
  }

  const expense = { category, amount, date };
  expenses.push(expense);

  totalAmount += amount;
  totalAmountBlock.textContent = `Total: ${totalAmount}`;

  addExpenseToTable(expense);
  saveToLocalStorage();

  selectCategory.value = "";
  inputAmount.value = "";
  inputDate.value = "";
});

window.addEventListener("load", loadFromLocalStorage);
