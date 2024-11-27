// Define your OpenWeatherMap API key and endpoint
const apiKey = '85d0c38ff21149c34045a69fcc502092'; // Replace with your actual OpenWeatherMap API key
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const forecastEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to fetch current weather data
async function getWeather(city) {
  const response = await fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === 200) {
    displayWeather(data);
  } else {
    document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
  }
}

// Function to fetch the 5-day 3-hour forecast
async function getForecast(city) {
  const response = await fetch(`${forecastEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === "200") {
    displayForecast(data);
  } else {
    console.log("Error fetching forecast data:", data);
    document.getElementById('forecast-info').innerHTML = `<p>Error fetching forecast data: ${data.message}</p>`;
  }
}

// Function to display current weather data
function displayWeather(data) {
  const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  const weatherHTML = `
    <h2>Weather in ${data.name}</h2>
    <p><img src="${weatherIcon}" alt="Weather icon"> ${data.weather[0].description}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
  document.getElementById('weather-info').innerHTML = weatherHTML;
}

// Function to display the 5-day forecast data
function displayForecast(data) {
  // Filter the data to display only one entry per day
  const filteredData = [];
  const dates = new Set();
  
  for (const entry of data.list) {
    const date = new Date(entry.dt * 1000).toLocaleDateString();
    if (!dates.has(date)) {
      dates.add(date);
      filteredData.push(entry);
    }
    if (filteredData.length >= 5) break;
  }

  const forecastHTML = filteredData.map((forecast) => {
    const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
    return `
      <div class="forecast">
        <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
        <p><img src="${weatherIcon}" alt="Weather icon"> ${forecast.weather[0].description}</p>
        <p>Temperature: ${forecast.main.temp}°C</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind Speed: ${forecast.wind.speed} m/s</p>
      </div>
    `;
  }).join('');
  document.getElementById('forecast-info').innerHTML = forecastHTML;
}

// Get weather for a default city (e.g., London)
const city = 'Perth';  // You can replace this with any city
getWeather(city);
getForecast(city);

// Add event listener for city search input
document.getElementById('searchButton').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  getWeather(city);
  getForecast(city);
});


