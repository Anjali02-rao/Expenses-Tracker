const selectCategory = document.querySelector("#select-category");
const inputAmount = document.querySelector("#input-amount");
const inputDate = document.querySelector("#input-date");
const addButton = document.querySelector("#add-button");
const expensesTable = document.querySelector("#expenses-table");
const totalAmountBlock = document.querySelector("#total-amount");

let expenses = [];
let totalAmount = 0;

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

  const newRow = expensesTable.insertRow();
  const categoryCell = newRow.insertCell();
  const AmountCell = newRow.insertCell();
  const dateCell = newRow.insertCell();
  const deleteCell = newRow.insertCell();

  categoryCell.textContent = category;
  AmountCell.textContent = amount;
  dateCell.textContent = date;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-button");
  deleteCell.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    const rowIndex = newRow.rowIndex - 1;
    // if (expenseIndex > -1) {
    expenses.splice(rowIndex, 1);

    totalAmount -= amount;
    totalAmountBlock.textContent = `Total: ${totalAmount}`;

    expensesTable.deleteRow(newRow.rowIndex - 1);
  });

  selectCategory.value = "";
  inputAmount.value = "";
  inputDate.value = "";
});
