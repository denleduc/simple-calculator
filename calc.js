const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('.text');
const operatorDisplay = document.querySelector('.operator-display');
let num1 = undefined, num2 = undefined, result = undefined, operator = undefined;

resetCalc();

buttons.forEach(button => button.addEventListener('click', process));



const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b !=0) ? a / b : easterEgg();
const power = (x, n) => Math.pow(x, n);


function process() {
  let classListofBtn = this.classList;
  switch (true) {
    case classListofBtn.contains('number'):
      if (operator == undefined) {
        if (num1 == undefined) num1 = '';
        if (this.name == '.' && num1.includes('.')) break;
        num1 += this.name;
        display.textContent = num1;
      } else {
        if (num2 == undefined) num2 = '';
        if (this.name == '.' && num2.includes('.')) break;
        num2 += this.name;
        display.textContent = num2;
      }
      break;

    case classListofBtn.contains('operators'):
      if (num1 == undefined && result != 0 && result != undefined) num1 = result;
      if (num1 == undefined && result == undefined) break;
      if (num2 != undefined) {
        operate();
        operator = this.name;
        setOperatorDisplay();
        num1 = result;
        break;
      }
      operator = this.name;
      setOperatorDisplay();
      break;

    case classListofBtn.contains('equal'):
      if (num2 == undefined) break;
      operate();
      break;

    case classListofBtn.contains('reset'):
      resetCalc();
      break;

    case classListofBtn.contains('backspace'):
      if (num2 == undefined) {
        num1 = num1.slice(0, num1.length-1);
        display.textContent = num1;
        break;
      }
      num2 = num2.slice(0, num2.length-1);
      display.textContent = num2;
      break;
  }
}

function operate() {
  switch (operator) {
    case '+':
      result = add(+num1, +num2);
      resetVars();
      display.textContent = result;
      break;

    case '-':
      result = substract(+num1, +num2);
      resetVars();
      display.textContent = result;
      break;

    case '*':
      result = multiply(+num1, +num2);
      resetVars();
      display.textContent = result;
      break;

    case '**':
      result = power(+num1, +num2);
      resetVars();
      display.textContent = result;
      break;

    case '/':
      if (+num2 == 0) {
        display.textContent = 'Nice try';
        result = undefined;
        resetVars();
        break;
      }
      result = divide(num1, num2);
      resetVars();
      display.textContent = result;
      break;

    default:
      display.textContent = 'Something went wrong';
      break;
  }
}

function roundNumber(num) {
  return Number.parseFloat(num).toFixed(2);
}

function setOperatorDisplay() {
  switch (operator) {
    case '+':
      operatorDisplay.textContent = '+';
      break;
    case '-':
      operatorDisplay.textContent = '-';
      break;
    case '*':
      operatorDisplay.textContent = '×';
      break;
    case '/':
      operatorDisplay.textContent = '÷';
      break;
    case '**':
      operatorDisplay.innerHTML = '𝑥<sup>𝑛</sup>';
      break;
  }
}

function resetVars() {
  num1 = undefined;
  num2 = undefined;
  operator = undefined;
  operatorDisplay.innerHTML = '';
}

function resetCalc() {
  num1 = undefined;
  num2 = undefined;
  result = undefined;
  operator = undefined;
  display.textContent = '0';
  operatorDisplay.innerHTML = '';
}

function easterEgg() {
  buttons.forEach(button => button.textContent = '0');
  display.style.fontSize = '15px';
  display.textContent = 'You like 0, don\'t you ? (Reload to continue.)';
}
