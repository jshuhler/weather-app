import { localWeather, getWeatherData } from "./weatherData.js";

// search bar
const searchForm = document.querySelector("form");
const searchBar = document.getElementById("location-input");
let tempUnit = "us"; // moving this definition around to find the right place for it

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await getWeatherData(searchBar.value,tempUnit);
    displayWeather(localWeather);
    searchBar.value = "";
});

// f & c toggle - event listener to call a function that's defined in weatherData.js 
// add class to span that is active to color differently
// let tempUnit = "metric"; // set initial value, other value is "metric"


// update the displayed weather 
const locationTitle = document.querySelector(".location-title");

const todayCurrentDate = document.getElementById("current-date");
const todayCurrentTemp = document.getElementById("current-temp");
const todayCurrentCondition = document.getElementById("current-conditions");
const todayCurrentHigh = document.getElementById("current-high");
const todayCurrentLow = document.getElementById("current-low");

const tomorrowDate = document.getElementById("tomorrow-date");
const tomorrowCondition = document.getElementById("tomorrow-conditions");
const tomorrowHigh = document.getElementById("tomorrow-high");
const tomorrowLow = document.getElementById("tomorrow-low");

function displayWeather(localWeather) {
    // location
    locationTitle.textContent = localWeather.current.location;
    updateWeatherIcon(localWeather);
    // today
    todayCurrentDate.textContent = localWeather.current.date;
    todayCurrentTemp.textContent = `${localWeather.current.temp}\u00B0F`;             
    todayCurrentCondition.textContent = localWeather.current.conditions;
    todayCurrentHigh.innerHTML = `<b>High:</b> ${localWeather.current.high}\u00B0F`;
    todayCurrentLow.innerHTML = `<b>Low:</b> ${localWeather.current.low}\u00B0F`;
    // tomorrow
    tomorrowDate.textContent = localWeather.tomorrow.date;
    tomorrowCondition.textContent = localWeather.tomorrow.conditions;
    tomorrowHigh.innerHTML = `<b>High:</b> ${localWeather.tomorrow.high}\u00B0F`;
    tomorrowLow.innerHTML = `<b>Low:</b> ${localWeather.tomorrow.low}\u00B0F`;
    // testing logs - TO REMOVE
    console.log("localWeather: ", localWeather);
    console.log(`It's currently ${localWeather.current.temp} and ${localWeather.current.conditions} with an expected high of ${localWeather.current.high} in ${localWeather.current.location}.`);
    console.log(`Tomorrow, ${localWeather.tomorrow.date}, ${localWeather.current.location} will be ${localWeather.tomorrow.conditions}, with a high of ${localWeather.tomorrow.high} and a low of ${localWeather.tomorrow.low}`)
};

// update condition icon
const todayIconContainer = document.getElementById("current-icon-container");
const todayWeatherIcon = document.getElementById("current-forecast-icon");
const tomorrowWeatherIcon = document.getElementById("tomorrow-forecast-icon");

function updateWeatherIcon(localWeather) {
    let todayIconId = localWeather.current.icon;
    let tomorrowIconId = localWeather.tomorrow.icon;
    import(`./img/weather-icons/${todayIconId}.png`).then((module) => {
        todayWeatherIcon.src = module.default;
    });
    import(`./img/weather-icons/${tomorrowIconId}.png`).then((module) => {
        tomorrowWeatherIcon.src = module.default;
    });
};

export {
    displayWeather,
}