import { localWeather, getWeatherData } from "./weatherData.js";

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

// f & c toggle - event listener to call a function that's defined in weatherData.js 

// update the displayed weather 
const locationTitle = document.querySelector(".location-title");
const todayCurrentTemp = document.getElementById("current-temp-today");

function displayWeather(localWeather) {
    locationTitle.textContent = localWeather.current.location;
    todayCurrentTemp.textContent = `${localWeather.current.temp}\u00B0F`;
    updateWeatherIcon(localWeather)
    console.log("localWeather: ", localWeather);
    console.log(`It's currently ${localWeather.current.temp} and ${localWeather.current.conditions} with an expected high of ${localWeather.current.high} in ${localWeather.current.location}.`);
    console.log(`Tomorrow, ${localWeather.tomorrow.date}, ${localWeather.current.location} will be ${localWeather.tomorrow.conditions}, with a high of ${localWeather.tomorrow.high} and a low of ${localWeather.tomorrow.low}`)
}

// update condition icon
const todayIconContainer = document.getElementById("current-icon");

function updateWeatherIcon(localWeather) {
    const todayWeatherIcon = document.createElement("img");
    let todayIconId = localWeather.current.icon;
    import('./img/weather-icons')
        .then((module) => {
            console.log(module)
            console.log(module.weatherIcons.todayIconId.path)
            todayWeatherIcon.src = todayIconId;

            // for (const icon in module) {
            //     if (localWeather.current.icon === )
            // }
        })

    todayIconContainer.appendChild(todayWeatherIcon)
}

export { 
    displayWeather,
}