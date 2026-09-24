let operator = undefined;
let operandA = "";
let operandB = "";

let display = "";

const ENTERING_OPERAND_A = 1;
const ENTERED_OPERATOR = 2;
const ENTERING_OPERAND_B = 3;
const ENTERED_EQUALS = 4;
let CALC_STATE = ENTERING_OPERAND_A;

const OPERATOR_ADD = "+";
const OPERATOR_SUBTRACT = "−";
const OPERATOR_MULTIPLY = "×";
const OPERATOR_DIVIDE = "÷";

const MAX_DISPLAY_LENGTH = 34;

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
    if(b === 0) {
        return "Error! Can't divide by 0";
    }
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function applyClear() {
    CALC_STATE = ENTERING_OPERAND_A;
    displayText.textContent = "";
    display = "";
    operandA = "";
    operandB = "";
    operator = undefined;
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", applyClear);
clearButton.addEventListener("mousedown", () => {
    clearButton.style.backgroundColor = "#df2752";
});

function applyDelete() {
    if(displayText.textContent === operandB) {
        operandB = operandB.slice(0, - 1);
    }
    else if(displayText.textContent === operandA) {
        operandA = operandA.slice(0, - 1);
    }
    display = display.toString().slice(0, - 1);
    displayText.textContent = display;
}

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", applyDelete);
deleteButton.addEventListener("mousedown", () => {
    deleteButton.style.backgroundColor = "#df2752";
});

function applyNumber(number) {
switch(CALC_STATE){
    case ENTERED_EQUALS:
        operandA = "";
        operandA = "";
        operandB = "";
        operator = undefined;
        if(operandA.length < MAX_DISPLAY_LENGTH) {
            operandA += number;
            display = operandA;
        }
        CALC_STATE = ENTERING_OPERAND_A;
        break;
    case ENTERING_OPERAND_A:
        if(number === ".") {
            const hasDot = operandA.split('').includes(".");
            if(hasDot) {
                return;
            }
        }
        if(operandA.length < MAX_DISPLAY_LENGTH) {
            operandA += number;
            display = operandA;
        }
        break;
    case ENTERED_OPERATOR:
        CALC_STATE = ENTERING_OPERAND_B;
    case ENTERING_OPERAND_B:
        if(number === ".") {
            const hasDot = operandB.split('').includes(".");
            if(hasDot) {
                return;
            }
        }
        if(operandB.length < MAX_DISPLAY_LENGTH) {
            operandB += number;
            display = operandB;
        }
        
        break;
    }
    displayText.textContent = display;
}

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyNumber(button.textContent);
    });
    button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "#021b24";
    });
});

function applyOperator(op) {
    CALC_STATE = ENTERED_OPERATOR;

    const aEmpty = operandA === "";
    const bEmpty = operandB === "";
    if (!aEmpty && !bEmpty) {
        display = operate(operator, Number(operandA), Number(operandB));
        displayText.textContent = display;
        operandA = display;
        operandB = "";
        operator = undefined;
    }

    switch(op) {
        case OPERATOR_ADD:
            operator = add;
            break;
        case OPERATOR_SUBTRACT:
            operator = subtract;
            break;
        case OPERATOR_MULTIPLY:
            operator = multiply;
            break;
        case OPERATOR_DIVIDE:
            operator = divide;
            break;
    }
}

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => applyOperator(button.textContent));
    button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "#021b24";
    });
});

function applyEquals() {
    if(operator === undefined) {
        return;
    }

    const aEmpty = operandA === "";
    const bEmpty = operandB === "";
    if (aEmpty && bEmpty) {
        return;
    }
    else if (aEmpty) {
        display = Number(operandB);
    }
    else if (bEmpty) {
        display = Number(operandA);
    }
    else {
        if(isNaN(Number(operandA))) {
            display = Number(operandB);
        }
        else if(isNaN(Number(operandB))) {
            display = Number(operandA);
        }
        else {
            display = operate(operator, Number(operandA), Number(operandB));
        }
    }

    displayText.textContent = display;
    operandA = display;
    operandB = "";
    operator = undefined;
    CALC_STATE = ENTERED_EQUALS;
}
const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", applyEquals);
equalsButton.addEventListener("mousedown", () => {
    equalsButton.style.backgroundColor = "#0b8d6a";
});

const allButtons = document.querySelectorAll("button");
document.addEventListener("mouseup", () => {
    allButtons.forEach(button => button.removeAttribute("style"));
});

window.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "Escape":
            applyClear();
            break;
        case "Backspace":
        case "Delete":
            applyDelete();
            break;
        case "1":
            applyNumber(1);
            break;
        case "2":
            applyNumber(2);
            break;
        case "3":
            applyNumber(3);
            break;
        case "4":
            applyNumber(4);
            break;
        case "5":
            applyNumber(5);
            break;
        case "6":
            applyNumber(6);
            break;
        case "7":
            applyNumber(7);
            break;
        case "8":
            applyNumber(8);
            break;
        case "9":
            applyNumber(9);
            break;
        case "0":
            applyNumber(0);
            break;
        case ".":
            applyNumber(".");
            break;
        case "=":
        case "Enter":
            applyEquals("=");
            break;
        case "+":
            applyOperator(OPERATOR_ADD);
            break;
        case "-":
            applyOperator(OPERATOR_SUBTRACT);
            break;
        case "*":
        case "x":
            applyOperator(OPERATOR_MULTIPLY);
            break;
        case "/":
            applyOperator(OPERATOR_DIVIDE);
            break;
    }
});
