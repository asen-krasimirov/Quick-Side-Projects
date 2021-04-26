import { createAPIDialog } from './api.js';

const api = createAPIDialog();


/* Getting City Information */

export async function getCityData(latitude, longitude) {
    let url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`;
    return await api.getData(url);
}


/* Getting Weather Information */

export async function getWeatherData(cityName) {
    let url = `http://api.weatherstack.com/current?access_key=9bc7eb7556db2835ffcb41293ae19753&query=${cityName}`;
    return await api.getData(url);
}


/* Getting City Wiki Information (unused) */

export async function getCityWikiData(cityName) {
    let url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${cityName}`;
    return await api.getData(url);
}