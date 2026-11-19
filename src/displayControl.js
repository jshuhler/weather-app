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
            e.target.classList.remove("inactive-unit");
            fToggle.classList.remove("active-unit");
            fToggle.classList.add("inactive-unit");
            if (localWeather.current.temp !== null) {
                displayWeather(localWeather,tempUnit);
            };
        } else if (e.target.id === "f-toggle" && tempUnit === "metric") {
            tempUnit = "us";
            e.target.classList.add("active-unit");
            e.target.classList.remove("inactive-unit");
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
const error = document.querySelector(".error");

searchForm.addEventListener('submit', async (e) => {
    console.log("tempUnit on search press: ", tempUnit)
    e.preventDefault();
    if (searchBar.value === "") {
        showError("Please provide a location.");
        return
    } 
    await getWeatherData(searchBar.value,tempUnit);
    displayWeather(localWeather,tempUnit);
    changeBackground(localWeather);
    searchBar.value = "";
    searchBar.blur();
});

function showError(message) {
    console.log("the showError call worked at least.")
    error.textContent = `${message}`;
};

// UPDATE DISPLAY
// variables
const locationTitle = document.querySelector(".location-title");

const initialLoad = document.querySelectorAll(".initial-load");

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
function displayWeather(localWeather,tempUnit) { // think about adding a class to the forecast-weather-card element to make it have a background when this runs so it doesn't appear until a search is performed.
    // removing styling before search results displayed
    initialLoad.forEach(element => {
        element.classList.remove("initial-load");
    })
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
    error.textContent = "";
    // testing logs - TO REMOVE
    console.log("localWeather: ", localWeather);
    console.log(`It's currently ${localWeather.current.temp} and ${localWeather.current.conditions} with an expected high of ${localWeather.current.high} in ${localWeather.current.location}.`);
    console.log(`Tomorrow, ${localWeather.tomorrow.date}, ${localWeather.current.location} will be ${localWeather.tomorrow.conditions}, with a high of ${localWeather.tomorrow.high} and a low of ${localWeather.tomorrow.low}`)
};

// changing background based on localWeather.current.icon
function changeBackground(localWeather) {
    const wrapper = document.getElementById("wrapper");

    wrapper.classList.value = "";
    if (localWeather.current.icon === "clear-day" || localWeather.current.icon === "partly-cloudy-day") {
        console.log("Triggered")
        wrapper.classList.add("day-clear-background");
    } else if (localWeather.current.icon === "clear-night" || localWeather.current.icon === "partly-cloudy-night") {
        wrapper.classList.add("night-clear-background");
    } else if (localWeather.current.icon === "cloudy" || localWeather.current.icon === "fog" || localWeather.current.icon === "rain" || localWeather.current.icon === "snow") {
        wrapper.classList.add("stormy-background");
    } else {
        wrapper.classList.add("undefined-background");
    };
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
    showError,
}