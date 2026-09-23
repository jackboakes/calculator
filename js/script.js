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

function clearCalculatorState() {
    CALC_STATE = ENTERING_OPERAND_A;
    displayText.textContent = "";
    display = "";
    operandA = "";
    operandB = "";
    operator = undefined;
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearCalculatorState);
clearButton.addEventListener("mousedown", () => {
    clearButton.style.backgroundColor = "#df2752";
});

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
    // TODO:: bug if operandA === operandB
    if(displayText.textContent === operandA) {
        operandA = operandA.slice(0, - 1);
    }
    else if(displayText.textContent === operandB) {
        operandB = operandB.slice(0, - 1);
    }
    display = display.toString().slice(0, - 1);
    displayText.textContent = display;
});
deleteButton.addEventListener("mousedown", () => {
    deleteButton.style.backgroundColor = "#df2752";
});

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        switch(CALC_STATE){
            case ENTERED_EQUALS:
                operandA = "";
                operandA = "";
                operandB = "";
                operator = undefined;
                if(operandA.length < MAX_DISPLAY_LENGTH) {
                    operandA += button.textContent;
                    display = operandA;
                }
                CALC_STATE = ENTERING_OPERAND_A;
                break;
            case ENTERING_OPERAND_A:
                if(button.id === "dot") {
                    const hasDot = operandA.split('').includes(".");
                    if(hasDot) {
                        return;
                    }
                }
                if(operandA.length < MAX_DISPLAY_LENGTH) {
                    operandA += button.textContent;
                    display = operandA;
                }
                break;
            case ENTERED_OPERATOR:
                CALC_STATE = ENTERING_OPERAND_B;
            case ENTERING_OPERAND_B:
                if(button.id === "dot") {
                    const hasDot = operandB.split('').includes(".");
                    if(hasDot) {
                        return;
                    }
                }
                if(operandB.length < MAX_DISPLAY_LENGTH) {
                    operandB += button.textContent;
                    display = operandB;
                }
                
                break;
        }
        displayText.textContent = display;
    });

    button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "#021b24";
    });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
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

        switch(button.textContent) {
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
    });

    button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "#021b24";
    });
});

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
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
        display = operate(operator, Number(operandA), Number(operandB));
    }

    displayText.textContent = display;
    operandA = display;
    operandB = "";
    operator = undefined;
    CALC_STATE = ENTERED_EQUALS;
});
equalsButton.addEventListener("mousedown", () => {
    equalsButton.style.backgroundColor = "#0b8d6a";
});

const allButtons = document.querySelectorAll("button");
document.addEventListener("mouseup", () => {
    allButtons.forEach(button => button.removeAttribute("style"));
});
