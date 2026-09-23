let operator;
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
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function clearCalculatorState() {
    CALC_STATE === ENTERING_OPERAND_A;
    displayText.textContent = "";
    display = "";
    operandA = "";
    operandB = "";
    operator = undefined;
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearCalculatorState());

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", () => {
    if(displayText.textContent === operandA) {
        operandA = operandA.slice(0, length - 1);
    }
    else if(displayText.textContent === operandB) {
        operandB = operandB.slice(0, length - 1);
    }
    display = display.slice(0, length - 1);
    displayText.textContent = display;
})

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
                if(operandA.length < MAX_DISPLAY_LENGTH) {
                    operandA += button.textContent;
                    display = operandA;
                }
                break;
            case ENTERED_OPERATOR:
                CALC_STATE = ENTERING_OPERAND_B;
            case ENTERING_OPERAND_B:
                if(operandB.length < MAX_DISPLAY_LENGTH) {
                    operandB += button.textContent;
                    display = operandB;
                }
                
                break;
        }
        displayText.textContent = display;
    });
});

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        CALC_STATE = ENTERED_OPERATOR;
        
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
});

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", () => {
    const a = parseInt(operandA); 
    const b = parseInt(operandB)
    display = operate(operator, a, b);
    displayText.textContent = display;
    operandA = display;
    operandB = "";
    operator = undefined;
    CALC_STATE = ENTERED_EQUALS;
});

