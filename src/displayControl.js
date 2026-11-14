import { localWeather, getWeatherData } from "./weatherData.js";

// search bar
const searchForm = document.querySelector("form");
const searchBar = document.getElementById("location-input");

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await getWeatherData(searchBar.value);
    displayWeather(localWeather);
    searchBar.value = "";
});

// f & c toggle - event listener to call a function that's defined in weatherData.js 

// update the displayed weather 
const locationTitle = document.querySelector(".location-title");
const todayCurrentTemp = document.getElementById("current-temp");
const todayCurrentCondition = document.getElementById("current-conditions");
const todayCurrentHigh = document.getElementById("current-high");
const todayCurrentLow = document.getElementById("current-low");

function displayWeather(localWeather) {
    locationTitle.textContent = localWeather.current.location;
    todayCurrentTemp.textContent = `${localWeather.current.temp}\u00B0F`;             
    updateWeatherIcon(localWeather);
    todayCurrentCondition.textContent = localWeather.current.conditions;
    todayCurrentHigh.innerHTML = `<b>High:</b> ${localWeather.current.high}\u00B0F`;
    todayCurrentLow.innerHTML = `<b>Low:</b> ${localWeather.current.low}\u00B0F`;
    console.log("localWeather: ", localWeather);
    console.log(`It's currently ${localWeather.current.temp} and ${localWeather.current.conditions} with an expected high of ${localWeather.current.high} in ${localWeather.current.location}.`);
    console.log(`Tomorrow, ${localWeather.tomorrow.date}, ${localWeather.current.location} will be ${localWeather.tomorrow.conditions}, with a high of ${localWeather.tomorrow.high} and a low of ${localWeather.tomorrow.low}`)
}

// update condition icon
const todayIconContainer = document.getElementById("current-icon-container");
const todayWeatherIcon = document.getElementById("current-forecast-icon");

function updateWeatherIcon(localWeather) {
    let todayIconId = localWeather.current.icon;
    import(`./img/weather-icons/${todayIconId}.png`).then((module) => {
        todayWeatherIcon.src = module.default;
    });
};

export { 
    displayWeather,
}