import https from "https";
import chalk from "chalk";

const url = "https://official-joke-api.appspot.com/random_joke";

function getJoke() {
  https.get(url, (response) => {

    const chunks = [];

    response.on("data", (chunk) => {
      chunks.push(chunk);
    });

    response.on("end", () => {
      const body = Buffer.concat(chunks);
      const joke = JSON.parse(body);
      console.log("\n");
        
      console.log(chalk.red(joke.setup));
      console.log(chalk.red.bgGray.bold(joke.punchline));

      console.log("\n");
    });

    response.on("error",(err)=>{
        console.error(err)
    })
  });
}

getJoke();
