import { format, parseISO } from "date-fns"

let localWeather = {
    current: {
        temp: null,
        high: null,
        low: null,
        location: null,
        conditions: null,
        date: null,
    },
    tomorrow: {
        date: null,
        high: null,
        low: null,
        conditions: null,
        date: null,
    }
}

// fetching overall weather data from visual crossing
async function getWeatherData(location,tempUnit) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${tempUnit}&iconSet=icons1`);
    const returnedWeatherData = await response.json();
    parseWeatherData(returnedWeatherData);
    console.log("returnedWeatherData: ",returnedWeatherData)
};

// cleaning up returned weather data and pushing to localWeather object for use
function parseWeatherData(returnedWeatherData) {
    // date testing
    console.log(returnedWeatherData.days[0].datetime)
    console.log(format(parseISO(returnedWeatherData.days[0].datetime), 'PP'))
    console.log(format(parseISO(returnedWeatherData.days[1].datetime), 'PP'))


    // CURRENT WEATHER
    localWeather.current.temp = returnedWeatherData.days[0].temp;
    localWeather.current.high = returnedWeatherData.days[0].tempmax;
    localWeather.current.low = returnedWeatherData.days[0].tempmin;
    localWeather.current.location = returnedWeatherData.resolvedAddress;
    localWeather.current.conditions = returnedWeatherData.currentConditions.conditions;
    localWeather.current.icon = returnedWeatherData.currentConditions.icon;
    localWeather.current.date = format(parseISO(returnedWeatherData.days[0].datetime), 'PPPP');
    // TOMORROW WEATHER
    localWeather.tomorrow.date = returnedWeatherData.days[1].datetime;
    localWeather.tomorrow.high = returnedWeatherData.days[1].tempmax;
    localWeather.tomorrow.low = returnedWeatherData.days[1].tempmin;
    localWeather.tomorrow.conditions = returnedWeatherData.days[1].conditions;
    localWeather.tomorrow.icon = returnedWeatherData.days[1].icon;
    localWeather.tomorrow.date = format(parseISO(returnedWeatherData.days[1].datetime), 'PPPP');
}

export {
    localWeather,
    getWeatherData,
};