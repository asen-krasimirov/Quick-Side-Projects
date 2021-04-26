import { getCityData, getWeatherData } from "./api/data.js";


let latitude;
let longitude;

let cityInfo;
let weatherInfo;
// let wikiInfo;

getLocation();

setTimeout(initialize, 1);

async function initialize() {
    cityInfo = await getCityData(latitude, longitude);
    weatherInfo = (await getWeatherData(cityInfo.locality)).current;

    setInformation();
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        document.getElementById("temperatureHolder").textContent = "You have rejected the location request.";
        document.getElementById("feelsLikeHolder").textContent = "";
    }
}
  
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}


function setInformation() {

    /* Setting Location Information */
    document.getElementById("cityName").firstChild.textContent = cityInfo.city;
    document.getElementById("countryName").textContent = ` ${cityInfo.countryName}`;

    /* Setting Temperature Information */
    document.getElementById("temperatureHolder").textContent = `${weatherInfo.temperature} C°`;
    document.getElementById("feelsLikeHolder").textContent = `Feels Like: ${weatherInfo.feelslike} C°`;
    document.getElementById("observationHolder").textContent = `Observation time: ${weatherInfo.observation_time}`;

    
    /* Setting Wind Information */
    const windInfoHolder = document.getElementById("windInfoHolder");
    windInfoHolder.children[0].firstChild.textContent = `Wind Speed: ${weatherInfo.wind_speed} k/h`;
    windInfoHolder.children[1].firstChild.textContent = `Wind Degree: ${weatherInfo.wind_degree}°`;
    windInfoHolder.children[2].firstChild.textContent = `Wind Direction: ${weatherInfo.wind_dir}`;
    
    /* Setting Weather Description */
    const weatherDescriptionHolder = document.getElementById("weatherDescriptionHolder");
    weatherDescriptionHolder.children[0].firstChild.textContent = `Local Description: ${weatherInfo.weather_descriptions[0]}`;
    weatherDescriptionHolder.children[1].firstChild.textContent = `Day Cycle: ${(weatherInfo.is_day == "yes") ? "Day Time" : "Night Time"}`;
    weatherDescriptionHolder.children[2].firstChild.textContent = `Pressure: ${weatherInfo.pressure} millibars`;

}