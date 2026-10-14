const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// TASK 1: Leap Year Checker
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

// TASK 2: Ticket Pricing
function getTicketPrice(age) {
  if (age <= 12) {
    return 10;
  } else if (age <= 17) {
    return 15;
  } else {
    return 20;
  }
}

// TASK 3: Fibonacci Sequence (Recursion)
function fibonacci(n) {
  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

// TASK 4: Palindrome Checker (Recursion)
function isPalindrome(text, left = 0, right = text.length - 1) {
  if (left >= right) {
    return true;
  }

  if (text[left] !== text[right]) {
    return false;
  }

  return isPalindrome(text, left + 1, right - 1);
}

function checkPalindrome(text) {
  const cleanedText = text.toLowerCase().replace(/[^a-z0-9]/g, "");

  return isPalindrome(cleanedText);
}

// Menu to run the tasks
async function main() {
  while (true) {
    console.log("\n===== JavaScript Checkpoint =====");
    console.log("1. Leap Year Checker");
    console.log("2. Ticket Pricing");
    console.log("3. Fibonacci Sequence");
    console.log("4. Palindrome Checker");
    console.log("5. Exit");

    const choice = await askQuestion("Choose a task (1-5): ");

    switch (choice.trim()) {
      case "1": {
        const year = Number(await askQuestion("Enter a year: "));

        if (!Number.isInteger(year) || year <= 0) {
          console.log("Please enter a valid positive year.");
        } else if (isLeapYear(year)) {
          console.log(`${year} is a leap year.`);
        } else {
          console.log(`${year} is not a leap year.`);
        }

        break;
      }

      case "2": {
        const age = Number(await askQuestion("Enter your age: "));

        if (!Number.isInteger(age) || age < 0) {
          console.log("Please enter a valid age.");
        } else {
          console.log(`Your movie ticket costs $${getTicketPrice(age)}.`);
        }

        break;
      }

      case "3": {
        const n = Number(
          await askQuestion("Enter the position of the Fibonacci number (n): "),
        );

        if (!Number.isInteger(n) || n < 0) {
          console.log("Please enter a non-negative integer.");
        } else {
          console.log(`Fibonacci(${n}) = ${fibonacci(n)}`);
        }

        break;
      }

      case "4": {
        const text = await askQuestion("Enter a string: ");

        if (checkPalindrome(text)) {
          console.log("The string is a palindrome.");
        } else {
          console.log("The string is not a palindrome.");
        }

        break;
      }

      case "5":
        console.log("Goodbye!");
        rl.close();
        return;

      default:
        console.log("Invalid choice. Please choose from 1 to 5.");
    }
  }
}

main();
