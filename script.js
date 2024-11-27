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

function showWeather() {
  const weatherData = [
    { time: '11/26/2024 5:30 PM', temp: '20°C', weather: 'clear sky', humidity: '57%', windSpeed: '5.88 m/s' },
    { time: '11/26/2024 8:30 PM', temp: '19.59°C', weather: 'clear sky', humidity: '52%', windSpeed: '6.29 m/s' },
    { time: '11/26/2024 11:30 PM', temp: '17.4°C', weather: 'clear sky', humidity: '51%', windSpeed: '5.37 m/s' },
    { time: '11/27/2024 2:30 AM', temp: '14.15°C', weather: 'clear sky', humidity: '58%', windSpeed: '4.86 m/s' },
    { time: '11/27/2024 5:30 AM', temp: '17.27°C', weather: 'clear sky', humidity: '46%', windSpeed: '5.53 m/s' }
  ];

  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = ''; // Clear existing content

  weatherData.forEach(day => {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weatherCard');
    
    weatherCard.innerHTML = `
      <h3>${day.time}</h3>
      <p>Temperature: ${day.temp}</p>
      <p>Weather: ${day.weather}</p>
      <p>Humidity: ${day.humidity}</p>
      <p>Wind Speed: ${day.windSpeed}</p>
    `;
    
    forecastContainer.appendChild(weatherCard);
  });

  document.getElementById('weatherContainer').style.display = 'block';
  document.getElementById('weatherContainer').scrollIntoView({ behavior: 'smooth' });
}

function searchWeather() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    document.getElementById("currentCity").innerText = city;
    // Add logic to fetch weather for the entered city and update the UI
  }
}