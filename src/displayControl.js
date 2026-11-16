import { localWeather, getWeatherData } from "./weatherData.js";

// SWITCHING TEMP UNIT
let tempUnit = "us";
const unitToggles = document.querySelectorAll(".unit-toggle");
const fToggle = document.getElementById("f-toggle");
const cToggle = document.getElementById("c-toggle");

unitToggles.forEach(element => {
    element.addEventListener('click', (e) => {
        if (e.target.id === "c-toggle" && tempUnit === "us") {
            tempUnit = "metric";
            e.target.classList.add("active-unit");
            fToggle.classList.remove("active-unit");
            fToggle.classList.add("inactive-unit");
            if (localWeather.current.temp !== null) {
                displayWeather(localWeather,tempUnit);
            };
        } else if (e.target.id === "f-toggle" && tempUnit === "metric") {
            tempUnit = "us";
            e.target.classList.add("active-unit");
            cToggle.classList.remove("active-unit");
            cToggle.classList.add("inactive-unit");
            if (localWeather.current.temp !== null) {
                displayWeather(localWeather,tempUnit);
            };
        };
    });
});

// SEARCHING FOR LOCATION
const searchForm = document.querySelector("form");
const searchBar = document.getElementById("location-input");


searchForm.addEventListener('submit', async (e) => {
    console.log("tempUnit on search press: ", tempUnit)
    e.preventDefault();
    await getWeatherData(searchBar.value,tempUnit);
    displayWeather(localWeather,tempUnit);
    searchBar.value = "";
});

// f & c toggle - event listener to call a function that's defined in weatherData.js 
// add class to span that is active to color differently
// let tempUnit = "metric"; // set initial value, other value is "metric"


// UPDATE DISPLAY
// variables
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

// function to rebuild DOM
function displayWeather(localWeather,tempUnit) {
    // location
    locationTitle.textContent = localWeather.current.location;
    updateWeatherIcon(localWeather);
    // today
    todayCurrentDate.textContent = localWeather.current.date;           
    todayCurrentCondition.textContent = localWeather.current.conditions;
    // tomorrow
    tomorrowDate.textContent = localWeather.tomorrow.date;
    tomorrowCondition.textContent = localWeather.tomorrow.conditions;
    // temp dependent
    if (tempUnit === "us") {
        todayCurrentTemp.textContent = `${localWeather.current.temp}\u00B0F`; 
        todayCurrentHigh.innerHTML = `<b>High:</b> ${localWeather.current.high}\u00B0F`;
        todayCurrentLow.innerHTML = `<b>Low:</b> ${localWeather.current.low}\u00B0F`;
        tomorrowHigh.innerHTML = `<b>High:</b> ${localWeather.tomorrow.high}\u00B0F`;
        tomorrowLow.innerHTML = `<b>Low:</b> ${localWeather.tomorrow.low}\u00B0F`;
    } else {
        todayCurrentTemp.textContent = `${localWeather.current.tempC}\u00B0C`; 
        todayCurrentHigh.innerHTML = `<b>High:</b> ${localWeather.current.highC}\u00B0C`;
        todayCurrentLow.innerHTML = `<b>Low:</b> ${localWeather.current.lowC}\u00B0C`;
        tomorrowHigh.innerHTML = `<b>High:</b> ${localWeather.tomorrow.highC}\u00B0C`;
        tomorrowLow.innerHTML = `<b>Low:</b> ${localWeather.tomorrow.lowC}\u00B0C`;
    }
    // testing logs - TO REMOVE
    console.log("localWeather: ", localWeather);
    console.log(`It's currently ${localWeather.current.temp} and ${localWeather.current.conditions} with an expected high of ${localWeather.current.high} in ${localWeather.current.location}.`);
    console.log(`Tomorrow, ${localWeather.tomorrow.date}, ${localWeather.current.location} will be ${localWeather.tomorrow.conditions}, with a high of ${localWeather.tomorrow.high} and a low of ${localWeather.tomorrow.low}`)
};

// UPDATE ICONS
// const todayIconContainer = document.getElementById("current-icon-container");
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