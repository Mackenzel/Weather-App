let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) minutes = "0" + minutes;
let hour = now.getHours();
if (hour > 12) hour = hour - 12;
let date = now.getDate();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let year = now.getFullYear();

let displayMinute = document.querySelector("#time-minute");
displayMinute.innerHTML = minutes;

let displayHour = document.querySelector("#time-hour");
displayHour.innerHTML = hour;

let displayDate = document.querySelector("#date");
displayDate.innerHTML = ` ${date}`;

let displayMonth = document.querySelector("#month");
displayMonth.innerHTML = month;

let displayYear = document.querySelector("#year");
displayYear.innerHTML = ` ${year}`;

let form = document.querySelector("#search-form");

function describeWeather(response) {
  console.log(response.data.wind.speed);
  let description = document.querySelector(`.describe-me`);
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector(`#wind`);
  wind.innerHTML = response.data.wind.speed;
}

function showCityTemp(response) {
  let cityName = response.data.name;
  let cityTemp = Math.round(response.data.main.temp);

  let foundCity = document.querySelector("h1");
  foundCity.innerHTML = `${cityName}`;
  let foundTemp = document.querySelector("#current-temp");
  foundTemp.innerHTML = `${cityTemp}`;
  describeWeather(response);
}

function citySearch(city) {
  let units = "imperial";
  let apiKey = "274afd25137632e37b720563347c5cdb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityTemp);
}
function formSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  citySearch(city);
}

form.addEventListener("submit", formSubmit);

let currentCityButton = document.querySelector("#my-city");

function locateCityTemp(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "274afd25137632e37b720563347c5cdb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCityTemp);
}

function findMyCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateCityTemp);
}

currentCityButton.addEventListener("submit", findMyCity);

citySearch("Winchester");
