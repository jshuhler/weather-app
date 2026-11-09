let localWeather = {
    current: {
        temp: null,
        high: null,
        low: null,
        location: null,
        conditions: null,
    },
    week: {
        date: null,
        high: null,
        low: null,
        conditions: null,
    }
}

async function getWeatherData(location) {
    console.log(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`);
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`);
    const returnedWeatherData = await response.json();
    const parsedWeatherData = await parseWeatherData(returnedWeatherData)
    console.log("returnedWeatherData: ",returnedWeatherData)
};

function parseWeatherData(parsedWeatherData) {
    // CURRENT WEATHER
    localWeather.current.temp = parsedWeatherData.currentConditions.temp;
    localWeather.current.high = parsedWeatherData.days[0].tempmax;
    localWeather.current.low = parsedWeatherData.days[0].tempmin;
    localWeather.current.location = parsedWeatherData.resolvedAddress;
    localWeather.current.conditions = parsedWeatherData.currentConditions.conditions;
    // UPCOMING WEEK WEATHER
    // localWeather.
}

export {
    localWeather,
    getWeatherData,
};