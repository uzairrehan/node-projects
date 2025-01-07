import { stdin, stdout } from "process";
import readline from "readline/promises";

const URL = "https://api.openweathermap.org/data/2.5/weather/";
const API_KEY = "ceb2743e2fb8728cd02392f3cb300809";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

async function show() {
  console.log("runnnig");
  const city = await rl.question("Enter the city name : ");
  await findWeather(city);
  rl.close();
}

async function findWeather(output) {
  try {
    const response = await fetch(
      `${URL}?q=${output}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) {
      console.log("Error fetching data !");
    }
    const data = await response.json();

    console.log(`Weather in ${data.name}, ${data.sys.country}:`);
    console.log(`Temperature: ${data.main.temp}°C`);
    console.log(`Condition: ${data.weather[0].main} (${data.weather[0].description})`);
    console.log(`Humidity: ${data.main.humidity}%`);
    console.log(`Wind: ${data.wind.speed} m/s at ${data.wind.deg}°`);
    console.log(`Visibility: ${data.visibility} meters`);

  } catch (error) {
    console.log(error);
    rl.close();
  }
}

show();
