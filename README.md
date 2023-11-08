
# UCI-BOOTCAMP-WEEK-6-WEATHER-DASHBOARD

___

## Project Description

This project is a weather forecast generator that provides weather details for the current day and 5 days ahead. The user can either use the search bar to look up a city or click on a "recent city" button to select a previously chosen city.

## How to run this project

![Weather Dashboard - demo](<assets/images/weather dashboard - demo.png>)

Click this link to visit the site:
[Weather Dashboard](https://kiyodosan.github.io/UCI-BOOTCAMP-WEEK-6-WEATHER-DASHBOARD/)

### Method 1: Search bar

Click on the search bar. Type in a city name. Click on the search icon (to the right of the search bar) to generate a weather forecast for that city. Each time a new city is selected, a "recent city" button will be generated.

### Method 2: Recent button

If the user has already input cities using the search bar method, "recent city" buttons will generate in the "Recent" section below the search bar. Clicking on a recent button will generate a weather forecast for the city listed on the button.

## How to use this project

The user can interact with the weather dashboard by using either the search bar or recent button method (see "How to run this project"). Each time a recent button is created using the search bar method, the city is stored in local storage. The 5 most recent cities forecasted are stored in an array at the beginning of the local storage list. This array is used to manipulate the list of recent cities.

The user can scroll through the page to view weather cards for the current day and a 5-day forecast.

List of weather card info:
* City Name
* Forecast date
* Weather icon based on weather description
* Weather in degrees fahrenheit
* Humidity %
* Wind speed in mph

### Error Handling
- When a user inputs a value that is not a city, the weather dashboard will cancel execution and maintain the current page state. The value will not be stored in local storage.

- When a duplicate search input value is selected, the value will not be stored in local storage. If it is not one of the 5 most recent cities, then it is added to the recent cities array.

- When the search input value is equal to one of the 5 most recent cities, its value will not be stored in local storage.

- When the array of recent cities reaches 5 elements, the least recent city is removed to make room for a new one, maintaining a consistent list of 5 cities.

## Credits

Tyler Odo

Get all values from local storage:
https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance

Weather card styling references:
https://www.youtube.com/watch?v=MIYQR-Ybrn4

Capitalize the first letter of each word:
https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/


## License

Default