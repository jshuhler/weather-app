import "./style.css";
import { localWeather, getWeatherData } from "./getWeatherData.js";
import { displayWeather } from "./displayControl.js";

await getWeatherData("Frankfurt")
displayWeather(localWeather)