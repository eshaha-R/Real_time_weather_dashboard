const apiKey = '85d0c38ff21149c34045a69fcc502092';
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const forecastEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';

window.onload = function() {
  displayCurrentWeather();
};

function displayCurrentWeather() {
  const currentWeather = {
    temperature: "20°C",
    description: "clear sky",
    humidity: "57%",
    windSpeed: "7.72 m/s"
  };

  document.getElementById("currentTemperature").innerText = `Temperature: ${currentWeather.temperature}`;
  document.getElementById("currentWeatherDescription").innerText = `Weather: ${currentWeather.description}`;
  document.getElementById("currentHumidity").innerText = `Humidity: ${currentWeather.humidity}`;
  document.getElementById("currentWindSpeed").innerText = `Wind Speed: ${currentWeather.windSpeed}`;
}

async function getWeather(city) {
  try {
    const response = await fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
      displayWeather(data);
    } else {
      document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

async function getForecast(city) {
  try {
    const response = await fetch(`${forecastEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === "200") {
      displayForecast(data);
    } else {
      console.log("Error fetching forecast data:", data);
      document.getElementById('forecast-info').innerHTML = `<p>Error fetching forecast data: ${data.message}</p>`;
    }
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}

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

function displayForecast(data) {
  const forecastHTML = data.list.map((forecast) => {
    return `
      <div class="forecast">
        <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
        <p>Time: ${new Date(forecast.dt * 1000).toLocaleTimeString()}</p>
        <p>Temperature: ${forecast.main.temp}°C</p>
        <p>Weather: ${forecast.weather[0].description}</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind Speed: ${forecast.wind.speed} m/s</p>
      </div>
    `;
  }).join('');
  document.getElementById('forecast-info').innerHTML = forecastHTML;
}

function showWeather() {
  const city = 'Perth'; // Default city to show weather
  getForecast(city);
}

