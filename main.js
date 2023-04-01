function getWeatherData() {
    const city = document.getElementById("search-city").value;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city +'&appid=';
  
    fetch('api_key.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('APIキーが取得できませんでした');
        }
        return response.text();
      })
      .then(apiKey => {
        const urlWithApiKey = url + apiKey;
        return fetch(urlWithApiKey);
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('天気情報が取得できませんでした');
        }
        return response.json();
      })
      .then(data => {
        displayWeatherData(data);
      })
      .catch(error => {
        console.log(error.message);
      });
  }
  
  function displayWeatherData(data) {
    const city = document.getElementById('city');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
  
    city.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp - 273.15)}℃`;
    description.textContent = data.weather[0].description;
  }
  

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('search-city');
  
    searchButton.addEventListener('click', () => {
      getWeatherData(cityInput.value);
    });
  
    cityInput.addEventListener('keypress', (event) => {
      console.log(event.key);
      if (event.key === 'Enter') {
        getWeatherData(cityInput.value);
      }
    });
});
  