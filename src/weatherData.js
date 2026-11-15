import { format, parseISO } from "date-fns"

let localWeather = {
    current: {
        temp: null,
        high: null,
        low: null,
        tempC: null,
        highC: null,
        lowC: null,
        location: null,
        conditions: null,
        date: null,
        icon: null,
    },
    tomorrow: {
        date: null,
        high: null,
        low: null,
        highC: null,
        lowC: null,
        conditions: null,
        date: null,
        icon: null,
    }
}

// fetching overall weather data from visual crossing
async function getWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&iconSet=icons1`);
    const returnedWeatherData = await response.json();
    parseWeatherData(returnedWeatherData);
    console.log("returnedWeatherData: ",returnedWeatherData)
};

// cleaning up returned weather data and pushing to localWeather object for use
function parseWeatherData(returnedWeatherData) {
    // CURRENT WEATHER
    // fahrenheit
    localWeather.current.temp = returnedWeatherData.days[0].temp;
    localWeather.current.high = returnedWeatherData.days[0].tempmax;
    localWeather.current.low = returnedWeatherData.days[0].tempmin;
    //celsius
    localWeather.current.tempC = convertToC(returnedWeatherData.days[0].temp);
    localWeather.current.highC = convertToC(returnedWeatherData.days[0].tempmax);
    localWeather.current.lowC = convertToC(returnedWeatherData.days[0].tempmin);
    // info
    localWeather.current.location = returnedWeatherData.resolvedAddress;
    localWeather.current.conditions = returnedWeatherData.currentConditions.conditions;
    localWeather.current.icon = returnedWeatherData.currentConditions.icon;
    localWeather.current.date = format(parseISO(returnedWeatherData.days[0].datetime), 'PPPP');
    
    // TOMORROW WEATHER
    // fahrenheit
    localWeather.tomorrow.high = returnedWeatherData.days[1].tempmax;
    localWeather.tomorrow.low = returnedWeatherData.days[1].tempmin;
    //celsius
    localWeather.tomorrow.highC = convertToC(returnedWeatherData.days[1].tempmax);
    localWeather.tomorrow.lowC = convertToC(returnedWeatherData.days[1].tempmin);
    // info
    localWeather.tomorrow.conditions = returnedWeatherData.days[1].conditions;
    localWeather.tomorrow.icon = returnedWeatherData.days[1].icon;
    localWeather.tomorrow.date = format(parseISO(returnedWeatherData.days[1].datetime), 'PPPP');
}

function convertToC(temp) {
    let tempC = (temp - 32)*(5/9);
    return Math.round(tempC*10)/10;
};

export {
    localWeather,
    getWeatherData,
};