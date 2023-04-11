//key for openweathermap.org
const apiKey = "0874a0c34932b42f00b0ae8cd523bab3";

//selecting elements
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

//function to check weather of a city using openweathermap.org api 
async function checkWeather(url) {
  //fetching data from api
  const response = await fetch(url);

  //if city not found
  if (response.status == 404) {
    //display error message
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    return;
  } else {
    var data = await response.json();
    //display weather details
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";
    
    //changing weather icon according to weather
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    } else if (data.weather[0] == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0] == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    //display weather details
    document.querySelector(".weather").style.display = "block";
    console.log(data);
  }
}

//getting weather of current location
navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  //api url
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  //calling function to check weather
  checkWeather(apiURL);
  //if error occurs
}, (error) => {
  //display error message
  console.log(error);
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
});

//getting weather of searched city
searchButton.addEventListener("click", () => {
  const city = searchInput.value;
  const apiURL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=" + city + "&appid=" + apiKey;
  checkWeather(apiURL);
});





