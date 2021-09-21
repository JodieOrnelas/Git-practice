//CALLS
timeAndDay();
auto();

//TIME
function timeAndDay() {
  let now = new Date();
  let timeText = document.querySelector("#time");
  let hours = now.getHours();
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  timeText.innerHTML = `${hours}:${now.getMinutes()} <br/>`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

  let todayText = document.querySelector("#today");
  todayText.innerHTML = `Today-${day}`;
}
//
//CURRENT (AUTOMATIC)

function showAuto(response) {
  let cityAuto = document.querySelector(".city-now");
  let autoTemp = document.querySelector("#tempToday");
  let autoWind = document.querySelector("#windToday");
  let autoPercip = document.querySelector("#percipToday");
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  autoTemp.innerHTML = `${temperature}℃`;
  autoPercip.innerHTML = response.data.weather[0].description;
  autoWind.innerHTML = `Wind Speed: ${windSpeed}mph`;
  cityAuto.innerHTML = `${response.data.name}`;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "427140810191e99fb93ea0eb8a6cf6df";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showAuto);
}
function auto() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
//SEARCHES
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearch");
  let cityNow = document.querySelector(".city-now");
  cityNow.innerHTML = ` ${searchInput.value}`;
  getWeatherSearch(searchInput.value);
}

function getWeatherSearch(city) {
  let apiKey = "427140810191e99fb93ea0eb8a6cf6df";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeatherSearch);
}

function showWeatherSearch(response) {
  let searchTemp = document.querySelector("#tempToday");
  let searchWind = document.querySelector("#windToday");
  let searchPercip = document.querySelector("#percipToday");
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  searchTemp.innerHTML = `${temperature}℃`;
  searchPercip.innerHTML = response.data.weather[0].description;
  searchWind.innerHTML = `Wind Speed: ${windSpeed}mph`;
}

let form = document.querySelector("#searchCity");
form.addEventListener("submit", search);
//
