const apiKey = '85d0c38ff21149c34045a69fcc502092'; 
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather';
const forecastEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';

async function getWeather(city) {
  const response = await fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  if (data.cod === 200) {
    displayWeather(data);
    setWeatherBackground(data.weather[0].main);
  } else {
    document.getElementById('weather-info').innerHTML = `<p>City not found. Please try again.</p>`;
  }
}

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

function displayWeather(data) {
  const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Larger icon
  const weatherHTML = `
    <div class="weatherCard">
      <h3>Weather in ${data.name}</h3>
      <p><img src="${weatherIcon}" alt="${data.weather[0].description}" title="${data.weather[0].description}"> ${data.weather[0].description}</p>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    </div>
  `;
  document.getElementById('weather-info').innerHTML = weatherHTML;
}

function displayForecast(data) {
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
    const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`; // Larger icon
    return `
      <div class="weatherCard">
        <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
        <p><img src="${weatherIcon}" alt="${forecast.weather[0].description}" title="${forecast.weather[0].description}"> ${forecast.weather[0].description}</p>
        <p><strong>Temperature:</strong> ${forecast.main.temp}°C</p>
        <p><strong>Humidity:</strong> ${forecast.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${forecast.wind.speed} m/s</p>
      </div>
    `;
  }).join('');
  document.getElementById('forecast-info').innerHTML = forecastHTML;
}

function setWeatherBackground(weather) {
  const body = document.body;
  body.classList.remove('sunny', 'cloudy', 'rainy', 'stormy', 'snowy');

  switch (weather.toLowerCase()) {
    case 'clear':
    case 'sunny':
      body.classList.add('sunny');
      break;
    case 'clouds':
    case 'cloudy':
      body.classList.add('cloudy');
      break;
    case 'rain':
    case 'drizzle':
      body.classList.add('rainy');
      break;
    case 'thunderstorm':
      body.classList.add('stormy');
      break;
    case 'snow':
      body.classList.add('snowy');
      break;
    default:
      body.style.background = 'linear-gradient(to right, #1e3c72, #2a5298)'; // Default background
      break;
  }
}

const city = 'Perth'; 
getWeather(city);

document.getElementById('searchButton').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  getWeather(city);
});

document.getElementById('showForecastButton').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  getForecast(city);
});
