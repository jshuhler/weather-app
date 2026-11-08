async function getWeatherData(location) {
    console.log(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`);
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`);
    const weatherData = await response.json();
    console.log("weatherData: ",weatherData)
    console.log("temp: ",weatherData.currentConditions.temp)
};

export {
    getWeatherData,
};