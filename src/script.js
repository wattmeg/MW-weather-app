//display date and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}
//end of determine date

//trigger the search
let triggerSearch = document.querySelector("#search-button");
triggerSearch.addEventListener("click", searchCity);

//search for city, temp in API
function searchCity(event) {
  event.preventDefault();
  let apiKey = "f5087t24cb396af33fo45026637ffd71";
  let newCity = document.querySelector("#city-search-input").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity}&units=metric&key=${apiKey}`;
  axios.get(apiUrl).then(showResults);
}

//show the search results
function showResults(response) {
  let city = document.querySelector("#city-display");
  let newCity = response.data.city;
  let oldCondition = document.querySelector("#icon-now");
  let oldTemp = document.querySelector("#current-temp");
  let newTemp = Math.round(response.data.temperature.current);
  let oldWind = document.querySelector("#wind-speed");
  let newWind = Math.round(response.data.wind.speed);
  let oldHumidity = document.querySelector("#humidity");
  let newHumidity = Math.round(response.data.temperature.humidity);
  let timeStamp = document.querySelector("#date-and-time");
  city.innerHTML = newCity;
  oldCondition.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  oldCondition.setAttribute("alt", `${response.data.condition.description}`);
  oldTemp.innerHTML = `${newTemp}°`;
  oldWind.innerHTML = `Wind: ${newWind} km/h`;
  oldHumidity.innerHTML = `Humidity: ${newHumidity}%`;
  timeStamp.innerHTML = formatDate(response.data.time * 1000);
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
  let apiKey = "f5087t24cb396af33fo45026637ffd71";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&units=metric&key=${apiKey}`;
  axios.get(apiUrl).then(showLocals);
}

function showLocals(response) {
  let city = document.querySelector("#city-display");
  let newCity = response.data.city;
  let oldTemp = document.querySelector("#current-temp");
  let newTemp = Math.round(response.data.temperature.current);
  let oldWind = document.querySelector("#wind-speed");
  let newWind = Math.round(response.data.wind.speed);
  let oldHumidity = document.querySelector("#humidity");
  let newHumidity = Math.round(response.data.temperature.humidity);
  let oldCondition = document.querySelector("#icon-now");
  city.innerHTML = newCity;
  oldTemp.innerHTML = `${newTemp}°`;
  oldWind.innerHTML = `Wind: ${newWind} km/h`;
  oldHumidity.innerHTML = `Humidity: ${newHumidity}%`;
  oldCondition.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  oldCondition.setAttribute("alt", `${response.data.condition.description}`);
  //let oldMinMax = document.querySelector("temp-min-max");
  // let newMin = Math.round(response.data.main.temp_min);
  // let newMax = Math.round(response.data.main.temp_max);
  //oldMinMax.innerHTML = `Min temp is ${newMin}, max temp is ${newMax}`;
}

let myLocation = document.querySelector("#my-location-button");
myLocation.addEventListener("click", getLocation);
