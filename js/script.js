let operator;
let operandA;
let operandB;

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
    operandA = undefined;
    operandB = undefined;
})

console.log(add(2, 7));
console.log(subtract(5,5,));
console.log(multiply(2,10));
console.log(divide(50, 10));