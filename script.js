const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const form = document.getElementById('form');

const dummyTransactions = [
    {
        id: 1,
        text: 'Flower',
        amount: -20
    },
    {
        id: 2,
        text: 'Instruments',
        amount: -20
    },
    {
        id: 3,
        text: 'Salary',
        amount: 200
    },
    {
        id: 4,
        text: 'Books',
        amount: -20
    },
]

let transactions = dummyTransactions;

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on sign
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn">X</button>
    `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc += item), 0).toFixed(2);
    const expense = (amounts.filter(item => item < 0).reduce((acc,item) => (acc += item), 0) * -1).toFixed(2);
    
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

}

// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();