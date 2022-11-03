//determine date
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function showDate(now) {
  return today;
}

let day = days[now.getDay()];
let today = `${day}`;
let hours = [now.getHours()];
let minutes = [now.getMinutes()];

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let theDay = document.querySelector("#date-and-time");
theDay.innerHTML = `${day} ${hours}:${minutes}`;
//end of determine date

//trigger the search
let triggerSearch = document.querySelector("#search-button");
triggerSearch.addEventListener("click", searchCity);

//search for city, temp in API
function searchCity(event) {
  event.preventDefault();
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let newCity = document.querySelector("#city-search-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showResults);
}

//show the search results
function showResults(response) {
  let city = document.querySelector("#city-display");
  let newCity = response.data.name;
  let oldTemp = document.querySelector("#current-temp");
  let newTemp = Math.round(response.data.main.temp);
  let oldWind = document.querySelector("#wind-speed");
  let newWind = Math.round(response.data.wind.speed);
  let oldHumidity = document.querySelector("#humidity");
  let newHumidity = Math.round(response.data.main.humidity);
  city.innerHTML = newCity;
  oldTemp.innerHTML = `${newTemp}°`;
  oldWind.innerHTML = `Wind speed is ${newWind} km/h`;
  oldHumidity.innerHTML = `Humidity is ${newHumidity}%`;
  //let oldIcon = document.querySelector("#icon-now");
  // let newIcon = response.data.weather.icon;
  // oldIcon.innerHTML = `${newIcon}`;
  //let oldMinMax = document.querySelector("temp-min-max");
  // let newMin = Math.round(response.data.main.temp_min);
  // let newMax = Math.round(response.data.main.temp_max);
  //oldMinMax.innerHTML = `Min temp is ${newMin}, max temp is ${newMax}`;
}

// show celsius
let celsiusTemp = document.querySelector("#temp-celsius-link");
celsiusTemp.addEventListener("click", searchCity);

//show fahrenheit
function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `73`;
}

let fahrenheitTemp = document.querySelector("#temp-fahrenheit-link");
fahrenheitTemp.addEventListener("click", showFahrenheit);
// end of show fahrenheit

//my location button search
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showLocals);
}

function showLocals(response) {
  let city = document.querySelector("#city-display");
  newCity = response.data.name;
  let oldTemp = document.querySelector("#current-temp");
  let newTemp = Math.round(response.data.main.temp);
  let oldWind = document.querySelector("#wind-speed");
  let newWind = Math.round(response.data.wind.speed);
  let oldHumidity = document.querySelector("#humidity");
  let newHumidity = Math.round(response.data.main.humidity);
  city.innerHTML = newCity;
  oldTemp.innerHTML = `${newTemp}°`;
  oldWind.innerHTML = `Wind speed is ${newWind} km/h`;
  oldHumidity.innerHTML = `Humidity is ${newHumidity}%`;
  //let oldIcon = document.querySelector("#icon-now");
  // let newIcon = response.data.weather.icon;
  // oldIcon.innerHTML = `${newIcon}`;
  //let oldMinMax = document.querySelector("temp-min-max");
  // let newMin = Math.round(response.data.main.temp_min);
  // let newMax = Math.round(response.data.main.temp_max);
  //oldMinMax.innerHTML = `Min temp is ${newMin}, max temp is ${newMax}`;
}

let myLocation = document.querySelector("#my-location-button");
myLocation.addEventListener("click", getLocation);
