let operator;
let operandA = "";
let operandB = "";

const displayText = document.querySelector(".display-text");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
    displayText.textContent = "";
    operandA = "";
    operandB = "";
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
    if(displayText.textContent === operandA) {
        operandA = operandA.slice(0, length - 1);
    }
    else if(displayText.textContent === operandB) {
        operandB = operandB.slice(0, length - 1);
    }
    displayText.textContent = displayText.textContent.slice(0, length - 1);
})

const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if(operandA.length < 34) {
            operandA += button.textContent;
        }
        displayText.textContent = operandA;
    });
});

