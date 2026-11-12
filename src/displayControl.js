import { localWeather, getWeatherData } from "./weatherData.js"

// search bar
const searchForm = document.querySelector("form");
const searchBar = document.getElementById("location-input");

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Search value: ",searchBar.value);
    await getWeatherData(searchBar.value);
    displayWeather(localWeather);
    searchBar.value = "";
});

// f and c toggle

// starting easy, just trying to get things logged in the console. 
function displayWeather(localWeather) {
    updateWeatherLocation(localWeather);
    // updateWeatherIcon()
    console.log("localWeather: ", localWeather);
    console.log(`It's currently ${localWeather.current.temp} and ${localWeather.current.conditions} with an expected high of ${localWeather.current.high} in ${localWeather.current.location}.`);
    console.log(`Tomorrow, ${localWeather.tomorrow.date}, ${localWeather.current.location} will be ${localWeather.tomorrow.conditions}, with a high of ${localWeather.tomorrow.high} and a low of ${localWeather.tomorrow.low}`)
}

// update name of city
const locationTitle = document.querySelector(".location-title");

function updateWeatherLocation(localWeather) {
    locationTitle.textContent = localWeather.current.location;
}

// update condition icon
const conditionIcon = document.querySelector(".condition-icon");
const todayWeatherCard = document.getElementById("today-weather")
function updateWeatherIcon(localWeather) {

}

export { 
    displayWeather,
}