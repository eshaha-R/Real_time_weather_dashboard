async function getForecast(city) {
  document.getElementById('forecast-info').innerHTML = `<p>Loading...</p>`;
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    document.getElementById('forecast-info').innerHTML = `<p>${error.message}. Please try again.</p>`;
  }
}

function displayForecast(data) {
  let forecastHTML = `<h2>Weather Forecast for ${data.city.name}</h2>`;
  data.list.forEach(forecast => {
    forecastHTML += `
      <div class="forecast-item">
        <p>${new Date(forecast.dt * 1000).toLocaleDateString()}</p>
        <p>Temperature: ${forecast.main.temp}°C</p>
        <p>Weather: ${forecast.weather[0].description}</p>
      </div>
    `;
  });
  document.getElementById('forecast-info').innerHTML = forecastHTML;
}

getForecast('London');
