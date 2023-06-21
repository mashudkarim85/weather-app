let result = document.getElementById("result");
let search_btn = document.getElementById("search-btn");
let city = document.getElementById("city");

const getWeatherData = () => {
  const city_value = city.value;
  const todayDate = new Date();

  if (city_value.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  } else {
    const key = "796f12c0820e7b770827a484278037e4";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city_value}&appid=${key}&units=metric`;
    city.value = "";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        result.innerHTML = `
        <h2>${data.name}</h2>
        <p style="font-size: 12px; margin-bottom: 24px; color: white">${dateManage(todayDate)}</p>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp}&#176;C</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">Humidity</h4>
                <h4 class="temp">${data.main.humidity}%</h4>
            </div>
            <div>
                <h4 class="title">Min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;C</h4>
            </div>
            <div>
                <h4 class="title">Max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;C</h4>
            </div>
        </div>
        `;
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};
search_btn.addEventListener("click", getWeatherData);
window.addEventListener("load", getWeatherData);


const dateManage = (dateArg)=> {
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];
  return ` ${day}, ${date} ${month}, ${year}`
}