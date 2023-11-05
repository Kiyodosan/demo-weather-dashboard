const searchBtn = document.querySelector("#searchBtn");

const cityId = document.querySelector("#cityDisplay");
const forecastId = document.querySelector("#forecastDisplay");

const currentDate = dayjs().format("dddd, MMM D YYYY");
let cityName = "";

getCity();

function getCity() {
  const inputField = document.querySelector("#inputField");
  let cityInput = "";
  let cityPlus = "";

  /////////////////// City of Los Angeles selected as default
  let reqUrl = "https://api.openweathermap.org/data/2.5/weather?q=los+angeles&appid=f6eb6271b9295e567afce5c507e2465d&units=imperial";
  const reqUrlPt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
  const reqUrlPt2 = "&appid=f6eb6271b9295e567afce5c507e2465d&units=imperial";

  let newCard = genCard();
  cityId.appendChild(newCard);

  let dateClass = document.querySelector(".date");
  dateClass.textContent = currentDate;

  searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    cityInput = inputField.value;
    cityName = firstLetterCap(cityInput);
    
    // Add recent location button to sidebar using cityName

    cityPlus = cityName.toLowerCase().replace(" ", "+");
    console.log(cityPlus);  /////////////////// Test

/*     if(cityId.contains("section")) {
      let newCard = genCard();
      cityId.appendChild(newCard);
    } */

    reqUrl = reqUrlPt1 + cityPlus + reqUrlPt2;
    apiObjGet(reqUrl);
  });
}

function genCard() {
  let secWeatherCard = document.createElement("section");
  secWeatherCard.classList.add("weather-card");

  let divWeather = document.createElement("div");
  divWeather.classList.add("weather");

  let h2City = document.createElement("h2");
  h2City.classList.add("city");

  let h3Date = document.createElement("h3");
  h3Date.classList.add("date");

  let imgWeatherIcon = document.createElement("img");
  imgWeatherIcon.classList.add("weather-icon");
  imgWeatherIcon.setAttribute("src", "./assets/images/clouds.png");
  imgWeatherIcon.setAttribute("alt", "weather icon");

  let pTemp = document.createElement("p");
  pTemp.classList.add("temp");

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

  // Return the dynamically generated weather card to be appended.
  return secWeatherCard;
}

// https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
function firstLetterCap(sentence) {
  const words = sentence.split(" ");
  
  for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}

function apiObjGet(link) {
  fetch(link).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);  /////////////////// Test

    let cityClass = document.querySelector(".city");

    // Only changes if URL has temp info
    if (data.main.temp > -1000) {
      cityClass.textContent = cityName;
    }

    let tempId = document.querySelector(".temp");
    tempId.textContent = data.main.temp + " °F";

    let humidityId = document.querySelector(".humidity");
    humidityId.textContent = data.main.humidity + " %";

    let windId = document.querySelector(".wind");
    windId.textContent = data.wind.speed.toFixed(0) + " mph";
    
    return 1;
  }).catch(function(err) {
    console.log(err);
    // Returning 0 to a boolean value for checking success or failure
    return 0;
  });
}