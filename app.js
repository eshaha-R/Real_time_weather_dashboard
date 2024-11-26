// Define your OpenWeatherMap API key and endpoint
const apiKey = '85d0c38ff21149c34045a69fcc502092'; // Replace with your actual OpenWeatherMap API key
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const forecastEndpoint = 'https://api.openweathermap.org/data/2.5/onecall';

// Function to fetch current weather data based on a city
async function getWeather(city) {
  const response = await fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === 200) {
    displayWeather(data);
    getForecast(data.coord.lat, data.coord.lon); // Fetch 7-day forecast using latitude and longitude
  } else {
    document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
  }
}

// Function to fetch 7-day forecast data
async function getForecast(lat, lon) {
  try {
    const response = await fetch(`${forecastEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    
    if (data.cod === 200) {
      displayForecast(data.daily); // Display 7-day forecast
    } else {
      document.getElementById('forecast-info').innerHTML = `<p>Error fetching forecast data.</p>`;
    }
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    document.getElementById('forecast-info').innerHTML = `<p>Error fetching forecast data. Please try again later.</p>`;
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

// Function to display the 7-day forecast
function displayForecast(forecast) {
  let forecastHTML = `<h2>7-Day Forecast</h2><div class="forecast-container">`;

  forecast.forEach(day => {
    const date = new Date(day.dt * 1000); // Convert Unix timestamp to Date object
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'short' });
    
    forecastHTML += `
      <div class="forecast-day">
        <h3>${dayName}</h3>
        <p>Temp: ${day.temp.day}°C</p>
        <p>Weather: ${day.weather[0].description}</p>
        <p>Humidity: ${day.humidity}%</p>
        <p>Wind Speed: ${day.wind_speed} m/s</p>
      </div>
    `;
  });

  forecastHTML += `</div>`;
  document.getElementById('forecast-info').innerHTML = forecastHTML;
}

// Get weather for a default city
getWeather('Perth'); // Replace with any city of your choice
