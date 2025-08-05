import readline from 'readline';

const rl: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Interface for calculation history as per task requirements
interface CalculationHistory {
    operation: string;
    operand1: number;
    operand2: number;
    result: number;
}

// Enum for operation choices as per task requirements
enum OperationChoice {
    ADD = 1,
    SUBTRACT = 2,
    MULTIPLY = 3,
    DIVIDE = 4,
    EXIT = 5,
    HISTORY = 6,
    POWER = 7,
    SQUARE_ROOT = 8,
    PERCENTAGE = 9
}

// Interface for calculator operations as per task requirements
interface CalculatorOperation {
    name: string;
    symbol: string;
    operation: (a: number, b: number) => number;
}

// Define available operations using the interface
const operations: Record<number, CalculatorOperation> = {
    [OperationChoice.ADD]: {
        name: "Add",
        symbol: "+",
        operation: add
    },
    [OperationChoice.SUBTRACT]: {
        name: "Subtract", 
        symbol: "-",
        operation: subtract
    },
    [OperationChoice.MULTIPLY]: {
        name: "Multiply",
        symbol: "*", 
        operation: multiply
    },
    [OperationChoice.DIVIDE]: {
        name: "Divide",
        symbol: "/",
        operation: divide
    },
    [OperationChoice.POWER]: {
        name: "Power",
        symbol: "^",
        operation: power
    }
};

let history: CalculationHistory[] = [];
let previousResult: number | null = null;

/**
 * Performs addition of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The sum of a and b
 */
function add(a: number, b: number): number {
    return a + b;
}

/**
 * Performs subtraction of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The difference of a and b
 */
function subtract(a: number, b: number): number {
    return a - b;
}

/**
 * Performs multiplication of two numbers
 * @param a - First number
 * @param b - Second number
 * @returns The product of a and b
 */
function multiply(a: number, b: number): number {
    return a * b;
}

/**
 * Performs division of two numbers with zero check
 * @param a - Dividend
 * @param b - Divisor
 * @returns The quotient of a and b
 * @throws Error when dividing by zero
 */
function divide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }
    return a / b;
}

/**
 * Performs power operation
 * @param base - Base number
 * @param exponent - Exponent number
 * @returns Base raised to the power of exponent
 */
function power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
}

/**
 * Performs square root operation
 * @param value - Number to find square root of
 * @returns Square root of the value
 * @throws Error for negative numbers
 */
function squareRoot(value: number): number {
    if (value < 0) {
        throw new Error("Cannot calculate square root of negative number.");
    }
    return Math.sqrt(value);
}

/**
 * Calculates percentage
 * @param a - Base number
 * @param b - Percentage value
 * @returns Percentage of a
 */
function percentage(a: number, b: number): number {
    return (a * b) / 100;
}

/**
 * Validates if input string is a valid number
 * @param value - String to validate
 * @returns True if valid number, false otherwise
 */
function isValidNumber(value: string): boolean {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
}

/**
 * Validates and converts string input to number
 * @param input - String input to validate
 * @returns Number if valid, null if invalid
 */
function validateNumber(input: string): number | null {
    if (!isValidNumber(input)) {
        return null;
    }
    return parseFloat(input);
}

/**
 * Handles invalid input by displaying error message
 * @param input - The invalid input received
 */
function handleInvalidInput(input: string): void {
    console.log(`Error: "${input}" is not a valid number. Please enter a valid number.`);
}

/**
 * Adds calculation to history
 * @param operation - Operation performed
 * @param operand1 - First operand
 * @param operand2 - Second operand  
 * @param result - Result of calculation
 */
function addToCalcHistory(operation: string, operand1: number, operand2: number, result: number): void {
    history.push({
        operation,
        operand1,
        operand2,
        result
    });
}

/**
 * Displays calculation history
 */
function showCalcHistory(): void {
    if (history.length === 0) {
        console.log("No calculations in history.");
        return;
    }
    
    console.log("\n=== Calculation History ===");
    history.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry.operand1} ${entry.operation} ${entry.operand2} = ${entry.result}`);
    });
    console.log("===========================\n");
}

/**
 * Displays available operations using the OperationChoice enum
 */
function showOperations(): void {
    console.log("\n=== Calculator Operations ===");
    console.log(`${OperationChoice.ADD}. Add (+)`);
    console.log(`${OperationChoice.SUBTRACT}. Subtract (-)`);
    console.log(`${OperationChoice.MULTIPLY}. Multiply (*)`);
    console.log(`${OperationChoice.DIVIDE}. Divide (/)`);
    console.log(`${OperationChoice.EXIT}. Exit`);
    console.log(`${OperationChoice.HISTORY}. Show History`);
    console.log(`${OperationChoice.POWER}. Power (^)`);
    console.log(`${OperationChoice.SQUARE_ROOT}. Square Root (√)`);
    console.log(`${OperationChoice.PERCENTAGE}. Percentage (%)`);
    console.log("c. Clear Memory");
    console.log("=============================\n");
}

/**
 * Displays welcome message
 */
function displayWelcomeMessage(): void {
    console.log("==========================================");
    console.log("   Welcome to TypeScript Calculator!     ");
    console.log("==========================================");
}

/**
 * Gets operation symbol using the operations record
 * @param choice - Operation choice
 * @returns Symbol representing the operation
 */
function getOperationSymbol(choice: string): string {
    const choiceNum = parseInt(choice);
    if (operations[choiceNum]) {
        return operations[choiceNum].symbol;
    }
    
    switch (choice) {
        case "8": return "√";
        case "9": return "%";
        default: return "";
    }
}

/**
 * Gets number input from user with validation
 * @param prompt - Prompt message to display
 * @returns Promise that resolves to a valid number
 */
function getNumberInput(prompt: string): Promise<number> {
    return new Promise((resolve) => {
        const askForInput = () => {
            rl.question(prompt, (input: string) => {
                const validatedNumber = validateNumber(input.trim());
                if (validatedNumber !== null) {
                    resolve(validatedNumber);
                } else {
                    handleInvalidInput(input);
                    askForInput(); // Ask again for valid input
                }
            });
        };
        askForInput();
    });
}

/**
 * Prompts for operation choice
 * @returns Promise that resolves to operation choice string
 */
function promptForOperation(): Promise<string> {
    return new Promise((resolve) => {
        rl.question("Enter your choice (1-9, c to clear memory): ", (choice: string) => {
            resolve(choice.trim().toLowerCase());
        });
    });
}

/**
 * Handles calculation errors
 * @param error - Error that occurred during calculation
 */
function handleCalculationError(error: Error): void {
    console.log(`Calculation Error: ${error.message}\n`);
}

/**
 * Exits the application gracefully
 */
function exitGracefully(): void {
    console.log("\n==========================================");
    console.log("   Thank you for using the calculator!   ");
    console.log("            Goodbye! 👋                  ");
    console.log("==========================================");
    rl.close();
}

/**
 * Handles the selected operation
 * @param choice - User's operation choice
 */
async function handleOperation(choice: string): Promise<void> {
    try {
        if (choice === OperationChoice.EXIT.toString()) {
            exitGracefully();
            return;
        }

        if (choice === OperationChoice.HISTORY.toString()) {
            showCalcHistory();
            await mainMenuLoop();
            return;
        }

        if (choice === "c") {
            previousResult = null;
            console.log("Memory cleared! Starting fresh.\n");
            await mainMenuLoop();
            return;
        }

        // For square root, we only need one number
        if (choice === OperationChoice.SQUARE_ROOT.toString()) {
            const prompt = previousResult !== null 
                ? `Enter number (or press Enter to use previous result: ${previousResult}): `
                : "Enter number for square root: ";
                
            const input = await new Promise<string>((resolve) => {
                rl.question(prompt, resolve);
            });

            const num = input.trim() === "" && previousResult !== null 
                ? previousResult 
                : validateNumber(input);

            if (num === null) {
                handleInvalidInput(input);
                await mainMenuLoop();
                return;
            }

            const result = squareRoot(num);
            previousResult = result;
            addToCalcHistory("√", num, 0, result);
            console.log(`Result: √${num} = ${result}\n`);
            await mainMenuLoop();
            return;
        }

        // For other operations, get two numbers
        const firstPrompt = previousResult !== null 
            ? `Enter first number (or press Enter to use previous result: ${previousResult}): `
            : "Enter first number: ";

        const firstInput = await new Promise<string>((resolve) => {
            rl.question(firstPrompt, resolve);
        });

        const num1 = firstInput.trim() === "" && previousResult !== null 
            ? previousResult 
            : validateNumber(firstInput);

        if (num1 === null) {
            handleInvalidInput(firstInput);
            await mainMenuLoop();
            return;
        }

        const num2 = await getNumberInput("Enter second number: ");

        let result: number;
        const symbol = getOperationSymbol(choice);
        const choiceNum = parseInt(choice);

        // Use the operations record for standard operations
        if (operations[choiceNum]) {
            result = operations[choiceNum].operation(num1, num2);
        } else {
            // Handle special cases
            switch (choice) {
                case OperationChoice.PERCENTAGE.toString():
                    result = percentage(num1, num2);
                    break;
                default:
                    console.log("Invalid operation. Please try again.");
                    await mainMenuLoop();
                    return;
            }
        }

        previousResult = result;
        addToCalcHistory(symbol, num1, num2, result);
        console.log(`Result: ${num1} ${symbol} ${num2} = ${result}`);

    } catch (error) {
        if (error instanceof Error) {
            handleCalculationError(error);
        } else {
            console.log("An unexpected error occurred.");
        }
    }

    await mainMenuLoop();
}

/**
 * Main menu loop for the calculator
 */
async function mainMenuLoop(): Promise<void> {
    try {
        showOperations();
        const choice = await promptForOperation();

        if ((choice >= "1" && choice <= "9") || choice === "c") {
            await handleOperation(choice);
        } else {
            console.log("Invalid input. Please choose a valid operation (1-9 or c).");
            await mainMenuLoop();
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(`An unexpected error occurred: ${error.message}`);
        }
        exitGracefully();
    }
}

/**
 * Main function to start the calculator
 */
async function main(): Promise<void> {
    try {
        displayWelcomeMessage();
        await mainMenuLoop();
    } catch (error) {
        if (error instanceof Error) {
            console.log(`An unexpected error occurred while starting the calculator: ${error.message}`);
        }
        exitGracefully();
    }
}

main();