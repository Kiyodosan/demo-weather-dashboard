// City of Los Angeles selected as default
// Arr[0] starts at 06:00 and a whole 24 hours passes at Arr[8]
let reqUrl = "https://api.openweathermap.org/data/2.5/forecast?q=los+angeles&appid=f6eb6271b9295e567afce5c507e2465d&units=imperial";
const reqUrlPt1 = "https://api.openweathermap.org/data/2.5/forecast?q=";
const reqUrlPt2 = "&appid=f6eb6271b9295e567afce5c507e2465d&units=imperial";

const sidebarId = document.querySelector("#sidebarPanel");
const cityId = document.querySelector("#cityDisplay");
const forecastId = document.querySelector("#forecastDisplay");
let cityName = "";

let idIndex = 0;
let dayIndex = 0;

const dayObj = dayjs();
const currentDay = dayObj.format("dddd, MMM D YYYY");

getCity();

// Activates upon clicking the search icon. Uses form input to select which city's weather forecast will be displayed.
function getCity() {
  displayBtn();

  const inputField = document.querySelector("#inputField");
  let cityInput = "";
  let cityPlus = "";

  const searchBtn = document.querySelector("#searchBtn");

  searchBtn.addEventListener("click", function(event) {
    cityInput = inputField.value.trim();
    cityName = firstLetterCap(cityInput);
    cityPlus = cityName.toLowerCase().replaceAll(" ", "+");
    console.log(cityPlus);  /////////////////// Test

    reqUrl = reqUrlPt1 + cityPlus + reqUrlPt2;
    getWeather(reqUrl);
  });
}

// Removes sidebar buttons (if any) then displays new buttons in order by most recent.
function displayBtn() {
  while (sidebarId.childElementCount > 1) {
    sidebarId.removeChild(sidebarId.lastChild);
  }

  let btnStack = JSON.parse(localStorage.getItem("recentList"));

  if (btnStack === null) {
    return;
  } else {
    for (let i = btnStack.length - 1; i >= 0; i--) {
      genBtn(btnStack[i], i);
    }
  }
}

// Creates a new button for the sidebar.
function genBtn(btnStackPos, index) {
  let newRecentBtn = document.createElement("button");
  newRecentBtn.setAttribute("type", "button");
  newRecentBtn.setAttribute("id", "recentBtn" + index);
  newRecentBtn.textContent = btnStackPos;

  newRecentBtn.addEventListener("click", function (event) {
    let clickText = event.target.textContent;
    cityName = firstLetterCap(clickText);
    let cityPlus = clickText.toLowerCase().replaceAll(" ", "+");
    
    reqUrl = reqUrlPt1 + cityPlus + reqUrlPt2;
    getWeather(reqUrl);
  });

  sidebarId.appendChild(newRecentBtn);
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

// Fetches weather data from the API and generates weather cards based on the info.
async function getWeather(link) {
  try {
    let response = await fetch(link);
    if (response.ok) {
      removeCards();

      let data = await response.json();
      console.log(data);  /////////////////// Test
  
      btnStorage();
      genCard(cityId);
      setData(data, 0);
  
      for (let i = 1; i < 6; i++) {
        genCard(forecastId);
        setData(data, i);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// Removes all cards from the main container.
// Resets idIndex and dayIndex to 0.
function removeCards() {
  if (cityId.childElementCount > 1) {
    cityId.innerHTML = "";
    let newH2 = document.createElement("h2");
    newH2.textContent = "Weather Info";
    cityId.appendChild(newH2);
  }

  if (forecastId.childElementCount > 1) {
    forecastId.innerHTML = "";
    let newH3 = document.createElement("h3");
    newH3.textContent = "5-Day Forecast";
    forecastId.appendChild(newH3);
  }

  idIndex = 0;
  dayIndex = 0;
}

// Checks local storage for existing keys.
// If city name is already listed, then this function cancels.
// If city name is not yet listed, then it is added to local storage.
// New cities are added to the btnStack. Only the 5 most recent buttons are kept.
function btnStorage() {
  let keys = getAllStorage();
  console.log(keys);  /////////////////// Test

  if (keys.includes(cityName)) {
    return;
  } else {
    let btnIndex = keys.length;

    // Create btnStack array if local storage is empty.
    if (btnIndex === 0) {
      let newStack = [];
      localStorage.setItem("recentList", JSON.stringify(newStack));
    } else if (btnIndex >=2) {
        btnIndex--;
    }

    let btnStack = JSON.parse(localStorage.getItem("recentList"));

    if (btnIndex < 5) {
      btnStack.push(cityName);
      localStorage.setItem("city" + btnIndex, cityName);
      localStorage.setItem("recentList", JSON.stringify(btnStack));
    } else {
      btnStack.shift();
      btnStack.push(cityName);
      localStorage.setItem("city" + btnIndex, cityName);
      localStorage.setItem("recentList", JSON.stringify(btnStack));
    }
    console.log(btnStack);  /////////////////// Test
  }

  displayBtn();
}

// Get all values from local storage and put them in an array.
// https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance
function getAllStorage() {
  let values = [];
  let keys = Object.keys(localStorage);
  let i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

// Creates a new weather card with unique IDs.
// Adds +1 to idIndex.
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
  h3Date.setAttribute("id", "date" + idIndex);
  h3Date.textContent = currentDay;

  let imgWeatherIcon = document.createElement("img");
  imgWeatherIcon.classList.add("weather-icon");
  imgWeatherIcon.setAttribute("src", "./assets/images/clouds.png");
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

// Adds weather data to a weather card.
function setData (weather, index) {
  let cityClass = document.querySelector("#city" + index);
  cityClass.textContent = cityName;

  let dateId = document.querySelector("#date" + index);
  dateId.textContent = dayObj.add(index, "day").format("dddd, MMM D YYYY");

  let switchIcon = weather.list[dayIndex].weather[0].main;
  let weatherIconId = document.querySelector("#weatherIcon" + index);

  // Changes weather icon based on weather
  switch (switchIcon) {
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
  tempId.textContent = weather.list[dayIndex].main.temp.toFixed(0) + " °F";

  let humidityId = document.querySelector("#humidity" + index);
  humidityId.textContent = weather.list[dayIndex].main.humidity + " %";

  let windId = document.querySelector("#wind" + index);
  windId.textContent = weather.list[dayIndex].wind.speed.toFixed(0) + " mph";

  if (dayIndex === 0) {
    dayIndex += 7;
  } else if (dayIndex >= 7) {
    dayIndex += 8;
  }
}