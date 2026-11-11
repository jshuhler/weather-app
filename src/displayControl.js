import { localWeather, getWeatherData } from "./weatherData.js"

// SEARCH LISTENER
const searchForm = document.querySelector("form");
const searchBar = document.getElementById("location-input");

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(searchBar.value);
    await getWeatherData(searchBar.value);
    displayWeather(localWeather);
    searchBar.value = "";
});

// starting easy, just trying to get things logged in the console. 
function displayWeather(localWeather) {

    console.log("localWeather: ", localWeather);
    // this returns lots of null values, I think it's running before the actual fetching is done. 
    console.log(`It's currently ${localWeather.current.temp} and ${localWeather.current.conditions} with an expected high of ${localWeather.current.high} in ${localWeather.current.location}.`);
    console.log(`Tomorrow, ${localWeather.tomorrow.date}, ${localWeather.current.location} will be ${localWeather.tomorrow.conditions}, with a high of ${localWeather.tomorrow.high} and a low of ${localWeather.tomorrow.low}`)
}

export { 
    displayWeather,
}