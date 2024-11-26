// Define your OpenWeatherMap API key and endpoint
const apiKey = '85d0c38ff21149c34045a69fcc502092'; // Replace with your OpenWeatherMap API key
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data based on a city
async function getWeather(city) {
  const response = await fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === 200) {
    displayWeather(data);
  } else {
    document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
  }
}

// Function to display weather data
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

// Get weather for a default city
getWeather('Perth'); // Replace with any city of your choice
