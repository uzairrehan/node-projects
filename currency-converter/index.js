import https from "https";
import readline from "readline";
import { configDotenv } from "dotenv";
configDotenv();

const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function show() {
  https.get(url, (response) => {
    const chunks = [];

    response.on("data", (chunk) => {
      chunks.push(chunk);
    });

    response.on("end", () => {
      const body = Buffer.concat(chunks);
      const fullData = JSON.parse(body);
      console.log(fullData.conversion_rates);
      rl.question(
        `Enter Currency name you want to convert to ${fullData.base_code} : `,
        (name) => {
          handleCurrency(name, fullData.conversion_rates);
        }
      );
    });

    response.on("error", (err) => {
      console.error(err);
    });
  });
}

function handleCurrency(name, rates) {
  if (name) {
    name = name.toUpperCase();
    rl.question("Enter Amount : ", (number) => {
      const convertedNumber = number * rates[name];
      console.log(convertedNumber);
      console.log("\nExiting program...");
      rl.close();
    });
  } else {
    rl.question(`Please enter right name! `, handleCurrency);
  }
}

show();
