// Define your OpenWeatherMap API key and endpoint
const apiKey = '85d0c38ff21149c34045a69fcc502092'; // Replace with your OpenWeatherMap API key
const weatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const forecastEndpoint = 'https://api.openweathermap.org/data/2.5/onecall';

// Function to fetch current weather data based on a city
async function getWeather(city) {
  const response = await fetch(`${weatherEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === 200) {
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    getForecast(lat, lon);  // Call function to fetch the 7-day forecast
    displayWeather(data);  // Call function to display the current weather
  } else {
    document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
  }
}

// Function to display current weather data
function displayWeather(data) {
  const weatherHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
  document.getElementById('weather-info').innerHTML = weatherHTML;
}

// Function to fetch 7-day weather forecast using latitude and longitude
async function getForecast(lat, lon) {
  const response = await fetch(`${forecastEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === "200") {
    displayForecast(data.daily);  // Call function to display the 7-day forecast
  } else {
    document.getElementById('forecast-info').innerHTML = `<p>Error fetching forecast data.</p>`;
  }
}

// Function to display the 7-day forecast
function displayForecast(dailyData) {
  let forecastHTML = '<h3>7-Day Forecast</h3>';
  
  dailyData.forEach((day, index) => {
    // Format the date for each day
    const date = new Date(day.dt * 1000);
    const dateStr = date.toLocaleDateString();

    // Display the high, low, and precipitation data
    forecastHTML += `
      <div class="forecast-day">
        <p><strong>${dateStr}</strong></p>
        <p>High: ${day.temp.max}°C</p>
        <p>Low: ${day.temp.min}°C</p>
        <p>Weather: ${day.weather[0].description}</p>
        <p>Precipitation: ${day.pop * 100}%</p> <!-- Pop represents precipitation probability -->
      </div>
    `;
  });

  document.getElementById('forecast-info').innerHTML = forecastHTML;
}

// Get weather for a default city
getWeather('Perth'); // Replace with any city of your choice
