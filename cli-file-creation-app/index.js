import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function show() {
  rl.question(
    "Enter File name with extension you want to create : ",
    handleFileCreation
  );
}

function handleFileCreation(nameOutput) {
  rl.question("Enter file data here : ", (dataOutput) => {
    fs.writeFile(nameOutput, dataOutput, "utf-8", (err) => {
      if (err) console.log(err);
    });
    console.log("File Created!");
    rl.close();
  });
}

show();
