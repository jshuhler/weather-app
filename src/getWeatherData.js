async function getWeatherData(location) {
    const url = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`)
    return url
}