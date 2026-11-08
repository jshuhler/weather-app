let localWeather = {
    current: {
        temp: null,
        high: null,
        low: null,
        location: null,
        conditions: null,
    },
    week: {
        temp: null,
        high: null,
        low: null,
        
    }
}

async function getWeatherData(location) {
    console.log(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`);
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`);
    const returnedWeatherData = await response.json();
    parseWeatherData(returnedWeatherData)
    console.log("returnedWeatherData: ",returnedWeatherData)
};

function parseWeatherData(returnedWeatherData) {
    // CURRENT WEATHER
    localWeather.current.temp = returnedWeatherData.currentConditions.temp;
    localWeather.current.location = returnedWeatherData.resolvedAddress;
    localWeather.current.high = returnedWeatherData.days[0].tempmax;
    localWeather.current.low = returnedWeatherData.days[0].tempmin;
    localWeather.current.conditions = returnedWeatherData.currentConditions.conditions;
    // UPCOMING WEEK WEATHER
    console.log("localWeather: ", localWeather)
}

export {
    getWeatherData,
};