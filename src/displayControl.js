import { localWeather } from "./getWeatherData.js"

function displayWeather(localWeather) {
    console.log("localWeather: ", localWeather);
    console.log(localWeather.current.conditions) // this is returning null, is it running BEFORE the fetch is done?
}

export { 
    displayWeather,
}