// GLOBAL VARIABLES
let triggerSearch = document.querySelector("#search-button");
let myLocation = document.querySelector("#my-location-button");
let celsiusTemperature = null;
let celsiusTemp = document.querySelector("#temp-celsius-link");
let fahrenheitTemp = document.querySelector("#temp-fahrenheit-link");
let gradient = document.querySelector("#container");
let playlist = document.querySelector("#spotify-playlist");

// FUNCTION TRIGGERS
triggerSearch.addEventListener("click", searchCity);
triggerSearch.addEventListener("click", getForecastPicked);
myLocation.addEventListener("click", getLocation);
myLocation.addEventListener("click", getForecastLocal);
celsiusTemp.addEventListener("click", searchCity);
fahrenheitTemp.addEventListener("click", showFahrenheit);
celsiusTemp.addEventListener("click", showCelsius);

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

// format forecast date
function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//receive forecast data for inputted city
function getForecastPicked() {
  let apiKey = "f5087t24cb396af33fo45026637ffd71";
  let newCity = document.querySelector("#city-search-input").value;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${newCity}&units=metric&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

//receive local forecast data
function getForecastLocal(position) {
  let apiKey = "f5087t24cb396af33fo45026637ffd71";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&units=metric&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

//build forecast days
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<li class="forecast"></li>`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `<li class="forecast"> ${formatForecastDate(
          forecastDay.time
        )}  ${Math.round(forecastDay.temperature.maximum)}°/ ${Math.round(
          forecastDay.temperature.minimum
        )}° <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"/> </li>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;

  let todayHighLow = document.querySelector("#temp-min-max");
  let newHigh = `${Math.round(response.data.daily[0].temperature.maximum)}`;
  let newLow = `${Math.round(response.data.daily[0].temperature.minimum)}`;
  todayHighLow.innerHTML = `High ${newHigh}°C / Low ${newLow}°C`;
}

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
  let oldFeels = document.querySelector("#description");
  let newFeels = response.data.condition.description;
  console.log(newFeels);
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
  oldTemp.innerHTML = `${newTemp}`;
  oldFeels.innerHTML = `${newFeels}`;
  oldWind.innerHTML = `Wind: ${newWind} km/h`;
  oldHumidity.innerHTML = `Humidity: ${newHumidity}%`;
  timeStamp.innerHTML = formatDate(response.data.time * 1000);
  celsiusTemperature = response.data.temperature.current;
  //change background gradient based on temperature result
  //update spotify playlist based on weather
  if (celsiusTemperature >= 20) {
    gradient.classList.remove("medium");
    gradient.classList.remove("cold");
    gradient.classList.add("hot");
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/playlist/37i9dQZF1DWVLVzn60NyuA?utm_source=generator`
    );
  } else if (celsiusTemperature <= 10) {
    gradient.classList.remove("hot");
    gradient.classList.remove("medium");
    gradient.classList.add("cold");
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/playlist/37i9dQZF1DX97m5YXQMpCi?utm_source=generator`
    );
  } else {
    gradient.classList.remove("hot");
    gradient.classList.remove("cold");
    gradient.classList.add("medium");
    playlist.setAttribute(
      "src",
      `https://open.spotify.com/embed/playlist/37i9dQZF1DX1mPHJeSJNRN?utm_source=generator`
    );
  }
}

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
  oldTemp.innerHTML = `${newTemp}`;
  oldWind.innerHTML = `Wind: ${newWind} km/h`;
  oldHumidity.innerHTML = `Humidity: ${newHumidity}%`;
  oldCondition.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  oldCondition.setAttribute("alt", `${response.data.condition.description}`);
  //change background gradient based on temperature result
  if (celsiusTemperature >= 20) {
    gradient.classList.remove("medium");
    gradient.classList.remove("cold");
    gradient.classList.add("hot");
  } else if (celsiusTemperature <= 10) {
    gradient.classList.remove("hot");
    gradient.classList.remove("medium");
    gradient.classList.add("cold");
  } else {
    gradient.classList.remove("hot");
    gradient.classList.remove("cold");
    gradient.classList.add("medium");
  }
}

// show celsius
function showCelsius(event) {
  event.preventDefault();
  let newCelsius = document.querySelector("#current-temp");
  fahrenheitTemp.classList.remove("active");
  celsiusTemp.classList.add("active");
  newCelsius.innerHTML = Math.round(response.data.temperature.current);
}

//show fahrenheit
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#current-temp");
  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");
  let newFahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitTemperature.innerHTML = Math.round(newFahrenheitTemperature);
}
// end of show fahrenheit
