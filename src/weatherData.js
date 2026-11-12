let localWeather = {
    current: {
        temp: null,
        high: null,
        low: null,
        location: null,
        conditions: null,
    },
    tomorrow: {
        date: null,
        high: null,
        low: null,
        conditions: null,
    }
}

// fetching overall weather data from visual crossing
async function getWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
        ${location}?
        unitGroup=us
        &iconSet=icons1`);
    const returnedWeatherData = await response.json();
    parseWeatherData(returnedWeatherData);
    console.log("returnedWeatherData: ",returnedWeatherData)
};

// cleaning up returned weather data and pushing to localWeather object for use
function parseWeatherData(returnedWeatherData) {
    // CURRENT WEATHER
    localWeather.current.temp = returnedWeatherData.currentConditions.temp;
    localWeather.current.high = returnedWeatherData.days[0].tempmax;
    localWeather.current.low = returnedWeatherData.days[0].tempmin;
    localWeather.current.location = returnedWeatherData.resolvedAddress;
    localWeather.current.conditions = returnedWeatherData.currentConditions.conditions;
    localWeather.current.icon = returnedWeatherData.currentConditions.icon;
    // UPCOMING WEEK WEATHER
    localWeather.tomorrow.date = returnedWeatherData.days[1].datetime;
    localWeather.tomorrow.high = returnedWeatherData.days[1].tempmax;
    localWeather.tomorrow.low = returnedWeatherData.days[1].tempmin;
    localWeather.tomorrow.conditions = returnedWeatherData.days[1].conditions;
    localWeather.tomorrow.icon = returnedWeatherData.days[1].icon;
}

export {
    localWeather,
    getWeatherData,
};