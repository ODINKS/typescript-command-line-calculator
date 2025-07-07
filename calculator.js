const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Store history of calculations
let history = [];
let previousResult = null; // Store the result of the last calculation

// Basic arithmetic functions
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
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }
  return a / b;
}

// Additional operations
function power(a, b) {
  return Math.pow(a, b);
}

function squareRoot(a) {
  return Math.sqrt(a);
}

function percentage(a, b) {
  return (a * b) / 100;
}

// Function to add a result to the history
function addToCalcHistory(operation, result) {
  history.push(`${operation} = ${result}`);
}

// Function to show the history of calculations
function showCalcHistory() {
  console.log("History of calculations:");
  history.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry}`);
  });
}

// Show available operations
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
  console.log("c. Clear Memory"); // New option to clear memory
}

// Welcome message
function welcomeMessage() {
  console.log("Welcome to Node.js command-line Calculator!");
}

// Main function to handle operations
function handleOperation(choice) {
  try {
    if (choice === "5") {
      console.log("Exiting calculator. Goodbye!");
      rl.close();
      return;
    }

    if (choice === "6") {
      // Show history
      showCalcHistory();
      promptChoice();
      return;
    }

    if (choice === "c") {
      // Clear memory and reset previous result
      previousResult = null;
      console.log("Memory cleared. Starting fresh!");
      promptChoice();
      return;
    }

    rl.question("Enter first number: ", (num1) => {
      if (previousResult !== null) {
        console.log(`Previous result: ${previousResult}`);
        num1 = previousResult; // Use previous result if available
      }

      rl.question("Enter second number: ", (num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);

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
              return;
          }

          previousResult = result; // Store result for next calculation
          addToCalcHistory(
            `${num1} ${getOperationSymbol(choice)} ${num2}`,
            result
          ); // Add to history
          console.log(`Result: ${result}`);
        } catch (error) {
          console.log(`Error: ${error.message}`);
        }
        promptChoice();
      });
    });
  } catch (error) {
    console.log(`An unexpected error occurred: ${error.message}`);
    rl.close();
  }
}

function getOperationSymbol(choice) {
  switch (choice) {
    case "1":
      return "+";
    case "2":
      return "-";
    case "3":
      return "*";
    case "4":
      return "/";
    case "7":
      return "^";
    case "8":
      return "√";
    case "9":
      return "%";
    default:
      return "";
  }
}

// Prompt the user for their operation choice
function promptChoice() {
  rl.question("Enter choice (1-9, c to clear memory): ", (choice) => {
    if ((choice >= "1" && choice <= "9") || choice === "c") {
      handleOperation(choice);
    } else {
      console.log("Invalid input. Please choose a valid operation (1-9 or c).");
      promptChoice(); // Ask for input again
    }
  });
}

// Main function to start the calculator
function main() {
  try {
    welcomeMessage();
    showOperations();
    promptChoice();
  } catch (error) {
    console.log(
      `An unexpected error occurred while starting the calculator: ${error.message}`
    );
    rl.close();
  }
}

main();
