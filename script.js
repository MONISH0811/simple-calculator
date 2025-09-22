const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
let currentInput = '';
let history = [];

function appendValue(value) {
  if (currentInput === '' && (value === '*' || value === '/' || value === '+' || value === '-')) {
    return; // Prevent starting with operator
  }
  currentInput += value;
  display.textContent = currentInput;
}

function clearDisplay() {
  currentInput = '';
  display.textContent = '0';
}

function calculateResult() {
  try {
    let result = eval(currentInput);
    display.textContent = result;

    // Save to history
    saveHistory(currentInput + ' = ' + result);

    currentInput = result.toString();
  } catch (err) {
    display.textContent = 'Error';
    currentInput = '';
  }
}

function saveHistory(entry) {
  history.push(entry);
  updateHistory();
}

function updateHistory() {
  historyList.innerHTML = '';
  history.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('history-item');
    div.innerHTML = `<span>${item}</span> <button class="delete-btn" onclick="deleteHistory(${index})">X</button>`;
    historyList.appendChild(div);
  });
}

function deleteHistory(index) {
  history.splice(index, 1);
  updateHistory();
}

function clearAllHistory() {
  history = [];
  updateHistory();
}
