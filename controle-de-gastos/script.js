const form = document.querySelector('#expense-form');
const descriptionInput = document.querySelector('#description');
const amountInput = document.querySelector('#amount');
const categoryInput = document.querySelector('#category');
const filterInput = document.querySelector('#filter-category');
const expenseList = document.querySelector('#expense-list');
const emptyState = document.querySelector('#empty-state');
const totalValue = document.querySelector('#total-value');
const expenseCount = document.querySelector('#expense-count');

const categoryIcons = {
  'Alimentação': '🍴',
  'Transporte': '🚗',
  'Casa': '🏠',
  'Lazer': '🎧',
  'Saúde': '💚',
  'Outros': '✦'
};

let expenses = JSON.parse(localStorage.getItem('controleDeGastos')) || [];

const formatCurrency = (value) => value.toLocaleString('pt-BR', {
  style: 'currency', currency: 'BRL'
});

function saveExpenses() {
  localStorage.setItem('controleDeGastos', JSON.stringify(expenses));
}

function updateSummary() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalValue.textContent = formatCurrency(total);
  expenseCount.textContent = `${expenses.length} ${expenses.length === 1 ? 'gasto' : 'gastos'}`;
}

function renderExpenses() {
  const selectedCategory = filterInput.value;
  const visibleExpenses = selectedCategory === 'Todas'
    ? expenses
    : expenses.filter((expense) => expense.category === selectedCategory);

  expenseList.innerHTML = '';
  emptyState.hidden = visibleExpenses.length !== 0;

  visibleExpenses.forEach((expense) => {
    const item = document.createElement('article');
    item.className = 'expense-item';
    item.innerHTML = `
      <div class="category-icon" aria-hidden="true">${categoryIcons[expense.category] || '✦'}</div>
      <div class="expense-info">
        <p class="expense-description">${escapeHTML(expense.description)}</p>
        <span class="expense-category">${expense.category}</span>
      </div>
      <p class="expense-amount">${formatCurrency(expense.amount)}</p>
      <button class="delete-button" type="button" aria-label="Excluir ${escapeHTML(expense.description)}" data-id="${expense.id}">×</button>
    `;
    expenseList.appendChild(item);
  });
  updateSummary();
}

function escapeHTML(text) {
  const element = document.createElement('span');
  element.textContent = text;
  return element.innerHTML;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;

  if (!description || !amount || amount <= 0 || !category) return;

  expenses.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    description,
    amount,
    category
  });
  saveExpenses();
  renderExpenses();
  form.reset();
  descriptionInput.focus();
});

expenseList.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-button');
  if (!deleteButton) return;
  expenses = expenses.filter((expense) => expense.id !== deleteButton.dataset.id);
  saveExpenses();
  renderExpenses();
});

filterInput.addEventListener('change', renderExpenses);
renderExpenses();
