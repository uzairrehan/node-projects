import readline from "readline";

const tasks = [];

const rdln = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function show() {
  console.log("\nEnter 1 to add a task!");
  console.log("Enter 2 to show all task!");
  console.log("Enter 3 to exit!");
  rdln.question("Enter here :", inputHandler);
}

function inputHandler(input) {
  if (input == 1) {
    rdln.question("Enter Task :", (input) => {
      tasks.push(input);
      console.log("Task Added");
      show();
    });
  } else if (input == 2) {
    console.log("\n");
    console.log("Your all tasks =");
    tasks.map((task, index) => {
      console.log(`${index + 1}. ${task}`);
    });

    show();
  } else if (input == 3) {
    console.log("Thanks for using Allah-hafiz");
    rdln.close();
  } else {
    console.log("Enter valid number");
    show();
  }
}

show();
