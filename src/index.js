import "./style.css";
import { localWeather, getWeatherData } from "./weatherData.js";
import { displayWeather } from "./displayControl.js";

await getWeatherData("Frankfurt")
displayWeather(localWeather)

// add a listener or something for on page load and put functions in it