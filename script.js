let displayArray = [];
let currentNum = '';
let lastValue;

const display = document.querySelector("#screen-display");
const displayButtons = document.querySelectorAll(".display");
const equalsButton = document.querySelector("#equals-button");
const clearButton = document.querySelector('#clear-button')

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;

const operate = (operator, x, y) => {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);
    default:
      return 5318008;
  }
};

const screenDisplay = () => {
  display.textContent = displayArray.join("");
};

const clear = () => {
    displayArray = [];
    currentNum = '';
    lastValue = undefined;
    screenDisplay();
}

const calculate = () => {
    while(displayArray.find(element => (isNaN(element)))){
        let idx = displayArray.indexOf(displayArray.find(element => (isNaN(element))));
        if(displayArray.some((element => element === '*' || element === '/'))){
            idx = displayArray.indexOf(displayArray.find(element => (element === '*' || element === '/')))
            displayArray.splice(idx - 1, 3, operate(displayArray[idx], displayArray[idx - 1], displayArray[idx + 1]))
        }
        else {
            displayArray.splice(idx - 1, 3, operate(displayArray[idx], displayArray[idx - 1], displayArray[idx + 1]))
        }  
    }

    
    if(displayArray[displayArray.length - 1] === Infinity){
        displayArray[0] = 'Listen here you little shit'
        screenDisplay();
        displayArray = []
        return;
    }


    screenDisplay();
    lastValue = displayArray[displayArray.length - 1];
    currentNum = '';
};

displayButtons.forEach(button => {
  button.addEventListener("click", e => {
    if (isNaN(e.target.value)) {
      if (!isNaN(lastValue)) {
        displayArray.push(e.target.value);
        currentNum = "";
      } else return;
    } else if (lastValue === "0" && !isNaN(e.target.value)) {
      return;
    } else {
      currentNum += e.target.value;
      if (isNaN(lastValue)) {
        displayArray.push(Number(e.target.value));
      } else {
        displayArray.splice(-1, 1, Number(currentNum));
      }
    }
    screenDisplay();
    lastValue = displayArray[displayArray.length - 1];
  });
});

equalsButton.addEventListener('click', () => calculate());

clearButton.addEventListener('click', () => clear());