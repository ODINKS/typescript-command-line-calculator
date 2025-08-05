import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let history = [];
let previousResult = null;
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
    if (b === 0)
        throw new Error("Cannot divide by zero.");
    return a / b;
}
function power(a, b) {
    return Math.pow(a, b);
}
function squareRoot(a) {
    return Math.sqrt(a);
}
function percentage(a, b) {
    return (a * b) / 100;
}
function addToCalcHistory(operation, result) {
    history.push(`${operation} = ${result}`);
}
function showCalcHistory() {
    console.log("History of calculations:");
    history.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry}`);
    });
}
function showOperations() {
    console.log("Select operation:");
    console.log("1. Add");
    console.log("2. Subtract");
    console.log("3. Multiply");
    console.log("4. Divide");
    console.log("5. Exit");
    console.log("6. History");
    console.log("7. Power");
    console.log("8. Square Root");
    console.log("9. Percentage");
    console.log("c. Clear Memory");
}
function welcomeMessage() {
    console.log("Welcome to Node.js command-line Calculator!");
}
function getOperationSymbol(choice) {
    switch (choice) {
        case "1": return "+";
        case "2": return "-";
        case "3": return "*";
        case "4": return "/";
        case "7": return "^";
        case "8": return "√";
        case "9": return "%";
        default: return "";
    }
}
function handleOperation(choice) {
    try {
        if (choice === "5") {
            console.log("Exiting calculator. Goodbye!");
            rl.close();
            return;
        }
        if (choice === "6") {
            showCalcHistory();
            promptChoice();
            return;
        }
        if (choice === "c") {
            previousResult = null;
            console.log("Memory cleared. Starting fresh!");
            promptChoice();
            return;
        }
        rl.question("Enter first number: ", (num1Str) => {
            const num1 = previousResult !== null ? previousResult : parseFloat(num1Str);
            rl.question("Enter second number: ", (num2Str) => {
                const a = num1;
                const b = parseFloat(num2Str);
                if (isNaN(a) || isNaN(b)) {
                    console.log("Error: Invalid number input. Please try again.");
                    promptChoice();
                    return;
                }
                let result;
                try {
                    switch (choice) {
                        case "1":
                            result = add(a, b);
                            break;
                        case "2":
                            result = subtract(a, b);
                            break;
                        case "3":
                            result = multiply(a, b);
                            break;
                        case "4":
                            result = divide(a, b);
                            break;
                        case "7":
                            result = power(a, b);
                            break;
                        case "8":
                            result = squareRoot(a);
                            break;
                        case "9":
                            result = percentage(a, b);
                            break;
                        default:
                            console.log("Invalid operation. Try again.");
                            promptChoice();
                            return;
                    }
                    previousResult = result;
                    addToCalcHistory(`${a} ${getOperationSymbol(choice)} ${b}`, result);
                    console.log(`Result: ${result}`);
                }
                catch (err) {
                    console.log(`Error: ${err.message}`);
                }
                promptChoice();
            });
        });
    }
    catch (error) {
        console.log(`An unexpected error occurred: ${error.message}`);
        rl.close();
    }
}
function promptChoice() {
    rl.question("Enter choice (1-9, c to clear memory): ", (choice) => {
        if ((choice >= "1" && choice <= "9") || choice === "c") {
            handleOperation(choice);
        }
        else {
            console.log("Invalid input. Please choose a valid operation (1-9 or c).");
            promptChoice();
        }
    });
}
function main() {
    try {
        welcomeMessage();
        showOperations();
        promptChoice();
    }
    catch (error) {
        console.log(`An unexpected error occurred while starting the calculator: ${error.message}`);
        rl.close();
    }
}
main();
//# sourceMappingURL=calculator.js.map