const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const form = document.getElementById('form');

// const dummyTransactions = [
//     {
//         id: 1,
//         text: 'Flower',
//         amount: -20
//     },
//     {
//         id: 2,
//         text: 'Instruments',
//         amount: -20
//     },
//     {
//         id: 3,
//         text: 'Salary',
//         amount: 200
//     },
//     {
//         id: 4,
//         text: 'Books',
//         amount: -20
//     },
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? 
localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === "" || text.value.trim() === "") {
        alert('Please enter all the inputs');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Generate random Id
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on sign
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
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

// Remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();

    init();
}

// Update local storage transaction
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

// Event listeners
form.addEventListener('submit', addTransaction);