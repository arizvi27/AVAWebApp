const timeElement = document.querySelector("h1");
const dateElement = document.querySelector("h2");

/**
 * @param {Date} date
 */
function formatTime(date) {
  const hours12 = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const isAm = date.getHours() < 12;

  return `${hours12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
}

/**
 * @param {Date} date
 */
function formatDate(date) {
  const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${DAYS[date.getDay()]}, ${
    MONTHS[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
}
setInterval(() => {
    const now = new Date();
    timeElement.textContent = formatTime(now);
    dateElement.textContent = formatDate(now);
  }, 200);
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value h3");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location h4");
const notificationElement = document.querySelector(".notification");
const weather = {};
weather.temperature = {
    unit : "fahrenheit"
}
const KELVIN = 273;
const key = "1fdced3ded32ba3f7d7f2bf293eb3b85";
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}
// Set User's Position
function setPosition(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    getWeather(lat, lon);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`
}

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor((data.main.temp - KELVIN) * 9/5 + 32);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}
function displayWeather(){
    iconElement.innerHTML = `<img src="images/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}