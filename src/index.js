import "./style.css";
import { localWeather, getWeatherData } from "./getWeatherData.js";
import { displayWeather } from "./displayControl.js";

getWeatherData("22305")
displayWeather(localWeather)