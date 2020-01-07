let displayArray = [];
let currentNum = '';
let lastValue = '';

const display = document.querySelector("#screen-display");
const displayButtons = document.querySelectorAll(".display");
const equalsButton = document.querySelector("#equals-button");
const clearButton = document.querySelector('#clear-button');
const popupMeme = document.querySelector('#meme-modal');
const closeModalButton = document.querySelector('.close-modal'); 


popupMeme.style.display = 'none';

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
    case "×":
      return multiply(x, y);
    case "/":
      return divide(x, y);
    default:
      return 5318008; //debugging number (because I have the mental age of a 14 year-old)
  }
};

const screenDisplay = () => {
  displayToNum();
  display.textContent = displayArray.join("");
  displayToStr();
};

const clear = () => {
    displayArray = [''];
    currentNum = '';
    lastValue = '';
    screenDisplay();
};

const displayToNum = () => {
    //convert strings in displayArray to numbers
  displayArray.forEach(function(element){
    if(!isNaN(element))
      element = Number(element);
  });
}

const displayToStr = () => {
  //convert strings in displayArray to numbers
    displayArray.forEach(function(element){
      if(!isNaN(element))
        element = element.toString();
  });
}

const calculate = () => {
    displayToNum();
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

    
    if(displayArray[displayArray.length - 1] === Infinity || displayArray[displayArray.length - 1] === -Infinity){
        displayArray = []
        screenDisplay();
        popupMeme.style.display = "block";
        return;
    }

    displayArray[0] = displayArray[0].toString();
    screenDisplay();
    lastValue = displayArray[displayArray.length - 1];
    currentNum = '';
};

displayButtons.forEach(button => {
  button.addEventListener("click", e => {
    if (lastValue === "0" && !isNaN(e.target.value)) { //check if the last value was a 0 to prevent numbers from displaying with leading 0's
      displayArray[displayArray.length - 1] = e.target.value;
      currentNum = e.target.value;
    }
    else if(!isNaN(e.target.value) || e.target.value === '.') { //checks if button pressed is a number or decimal
      
      if (currentNum === '' && e.target.value === '.')  // checks if decimal is the first button pressed
        currentNum = '0.'
      else if(!currentNum.includes('.') || !isNaN(e.target.value))  // checks if a decimal has already been included in the current number
      currentNum += e.target.value;
      else return

      if (isNaN(lastValue)) { //checks if the last value was a +-*/
        displayArray.push(e.target.value);
      } else {
        displayArray.splice(-1, 1, currentNum);
      }
    } else if (isNaN(e.target.value)) { //checks if the button pressed is a +-*/
      if (!isNaN(lastValue)) {  //checks if the last value was a number
        displayArray.push(e.target.value);
        currentNum = '';
      } else return;
    }
    screenDisplay();
    lastValue = displayArray[displayArray.length - 1];
  });
});


closeModalButton.onclick = function() {
  popupMeme.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == popupMeme) {
    popupMeme.style.display = "none";
  }
}

equalsButton.addEventListener('click', () => calculate());

clearButton.addEventListener('click', () => clear());