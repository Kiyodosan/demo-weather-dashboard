const searchBtn = document.querySelector("#searchBtn");

const cityId = document.querySelector("#cityDisplay");
const forecastId = document.querySelector("#forecastDisplay");
let idIndex = 0;

const currentDate = dayjs().format("dddd, MMM D YYYY");
const dateUrlPt1 = dayjs().format("YYYY-MM-");
const dateUrlPt2 = dayjs().format("DD");

let cityName = "";

getCity();

// Activates upon clicking the search icon. Uses form input to select which city's weather forecast will be displayed.
function getCity() {
  const inputField = document.querySelector("#inputField");
  let cityInput = "";
  let cityPlus = "";

  // City of Los Angeles selected as default
  let reqUrl = "https://api.openweathermap.org/data/2.5/weather?q=los+angeles&appid=f6eb6271b9295e567afce5c507e2465d&units=imperial&date=";
  const reqUrlPt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
  const reqUrlPt2 = "&appid=f6eb6271b9295e567afce5c507e2465d&units=imperial&date=";

  searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    cityInput = inputField.value;
    cityName = firstLetterCap(cityInput);
    cityPlus = cityName.toLowerCase().replace(" ", "+");
    console.log(cityPlus);  /////////////////// Test

    removeCards();

    // Add recent location button to sidebar using cityName

    reqUrl = reqUrlPt1 + cityPlus + reqUrlPt2;

    let weatherData = weatherGet(reqUrl + dateUrlPt1 + dateUrlPt2);

    if (idIndex === 0) {
      genCard(cityId);
      setData(weatherData, 0);
    }

    let nextDate = dateUrlPt2;

    for (let i = 1; i < 6; i++) {
      nextDate = nextDate.add(1, "days");
      weatherData = weatherGet(reqUrl + dateUrlPt1 + nextDate);
      genCard(forecastId);
      setData(weatherData, i);
    }
  });
}

/* function removeCards() {
  if (cityId.childElementCount >= 2) {
    cityId.removeChild(cityId.lastChild);
    idIndex--;
  }

  let forecastCardCt = forecastId.childElementCount;
  if (forecastCardCt >= 6) {
    for (let i = 1; i < forecastCardCt; i++) {
      forecastId.removeChild(forecastId.lastChild);
      idIndex--;
    }
  }
} */

// Removes all cards from the main container.
function removeCards() {
  if (cityId.childElementCount >= 2) {
    cityId.innerHTML = "";
    let newH2 = document.createElement("h2");
    newH2.textContent = "Weather Info";
    cityId.appendChild(newH2);
  }

  while (forecastId.childElementCount > 1) {
    forecastId.removeChild(forecastId.lastChild);
  }

  idIndex = 0;
}

// Creates a new weather card with unique IDs.
function genCard(display) {
  let secWeatherCard = document.createElement("section");
  secWeatherCard.classList.add("weather-card");
  secWeatherCard.setAttribute("id", "card" + idIndex);

  let divWeather = document.createElement("div");
  divWeather.classList.add("weather");

  let h2City = document.createElement("h2");
  h2City.classList.add("city");
  h2City.setAttribute("id", "city" + idIndex);

  let h3Date = document.createElement("h3");
  h3Date.classList.add("date");
  h3Date.textContent = currentDate;

  let imgWeatherIcon = document.createElement("img");
  imgWeatherIcon.classList.add("weather-icon");
  imgWeatherIcon.setAttribute("src", "./assets/images/clouds.png"); /////////////////// Must choose icon based on weather
  imgWeatherIcon.setAttribute("alt", "weather icon");
  imgWeatherIcon.setAttribute("id", "weatherIcon" + idIndex);

  let pTemp = document.createElement("p");
  pTemp.classList.add("temp");
  pTemp.setAttribute("id", "temp" + idIndex);

  let divWeatherDetails = document.createElement("div");
  divWeatherDetails.classList.add("weather-details");

  let divDetailsCol1 = document.createElement("div");
  divDetailsCol1.classList.add("details-col");

  let imgHumidityIcon = document.createElement("img");
  imgHumidityIcon.setAttribute("src", "./assets/images/humidity.png");
  imgHumidityIcon.setAttribute("alt", "humidity icon");

  let newDiv1 = document.createElement("div");

  let pHumidity = document.createElement("p");
  pHumidity.classList.add("humidity");
  pHumidity.setAttribute("id", "humidity" + idIndex);

  let pHumidityText = document.createElement("p");
  pHumidityText.textContent = "Humidity";

  let divDetailsCol2 = document.createElement("div");
  divDetailsCol2.classList.add("details-col");

  let imgWindIcon = document.createElement("img");
  imgWindIcon.setAttribute("src", "./assets/images/wind.png");
  imgWindIcon.setAttribute("alt", "wind icon");

  let newDiv2 = document.createElement("div");

  let pWind = document.createElement("p");
  pWind.classList.add("wind");
  pWind.setAttribute("id", "wind" + idIndex);

  let pWindText = document.createElement("p");
  pWindText.textContent = "Wind Speed";

  secWeatherCard.appendChild(divWeather);

  divWeather.appendChild(h2City);
  divWeather.appendChild(h3Date);
  divWeather.appendChild(imgWeatherIcon);
  divWeather.appendChild(pTemp);
  divWeather.appendChild(divWeatherDetails);

  divWeatherDetails.appendChild(divDetailsCol1);
  
  divDetailsCol1.appendChild(imgHumidityIcon);
  divDetailsCol1.appendChild(newDiv1);
  
  newDiv1.appendChild(pHumidity);
  newDiv1.appendChild(pHumidityText);

  divWeatherDetails.appendChild(divDetailsCol2);

  divDetailsCol2.appendChild(imgWindIcon);
  divDetailsCol2.appendChild(newDiv2);

  newDiv2.appendChild(pWind);
  newDiv2.appendChild(pWindText);

  display.appendChild(secWeatherCard);

  idIndex++;
}

// Changes the first letter of each word to uppercase.
// https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
function firstLetterCap(sentence) {
  const words = sentence.split(" ");
  
  for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}

/* // Fetches weather data from the API and generates weather cards based on the info.
function weatherGet(link) {
  fetch(link).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);  /////////////////// Test

    if (idIndex === 0) {
      genCard(cityId);
      setData(data, 0);
    }

    let nextDate = idIndex;
    if (nextDate < 10) {
      nextDate = "0" + idIndex;
    }
    /////////////////// Need to set the date differently on these cards.
    for (let i = 1; i < 6; i++) {
      genCard(forecastId);
      setData(data, i);
    }

    return 1;
  }).catch(function(err) {
    console.log(err);
    // Returning 0 to a boolean value for checking success or failure
    return 0;
  });
} */

// Fetches weather data from the API and generates weather cards based on the info.
function weatherGet(link) {
  fetch(link).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);  /////////////////// Test
    return data;
  }).catch(function(err) {
    console.log(err);
    // Returning 0 to a boolean value for checking success or failure
    return 0;
  });
}

// Adds weather data to a weather card.
function setData (weather, index) {
  let cityClass = document.querySelector("#city" + index);

/*   // Only changes if URL has temp info
  if (weather.main.temp > -1000) {
    cityClass.textContent = cityName;
  } */

  cityClass.textContent = cityName;

  let switchIcon = weather.weather[0].main; /////////////////// Need to find way to traverse object
  let weatherIconId = document.querySelector("#weatherIcon" + index);

  // Changes weather icon based on weather
  switch (switchIcon) {  /////////////////// Issue targeting weather main (weather description)
    case "Clear":
      weatherIconId.setAttribute("src", "./assets/images/clear.png");
      break;
    case "Clouds": 
      weatherIconId.setAttribute("src", "./assets/images/clouds.png");
      break;
    case "Drizzle":
      weatherIconId.setAttribute("src", "./assets/images/drizzle.png");
      break;
    case "Mist":
      weatherIconId.setAttribute("src", "./assets/images/mist.png");
      break;
    case "Rain":
      weatherIconId.setAttribute("src", "./assets/images/rain.png");
      break;
    case "Snow":
      weatherIconId.setAttribute("src", "./assets/images/snow.png");
      break;
  }

  let tempId = document.querySelector("#temp" + index);
  tempId.textContent = weather.main.temp + " °F";

  let humidityId = document.querySelector("#humidity" + index);
  humidityId.textContent = weather.main.humidity + " %";

  let windId = document.querySelector("#wind" + index);
  windId.textContent = weather.wind.speed.toFixed(0) + " mph";
}