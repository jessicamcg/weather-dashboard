
    // 4ff77886755c8b9237b9bb4bb1c1e2bf

var cityNameInputForm = $('#input-city-name');
var cityInfoEl = $('#city-card');

// function init() {
//     //localStorage.getItem()
// };

function handleSubmitFormSearch(event) {

    event.preventDefault();
    var cityName = cityNameInputForm.val().trim();
    if (cityName) {
        getCityWeather(cityName);
    } else {
        alert('Please enter a city name')
    }
};

function getCityWeather(city) {
    var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&units=imperial&appid=4ff77886755c8b9237b9bb4bb1c1e2bf'

    $.ajax({
        url: currentUrl,
        method: 'GET',
    }).then(function (response) {
        renderCityWeather(response);
        getForecast(response.coord.lat,response.coord.lon)
    });


};

function renderCityWeather(data) {

    var today = moment().format("L");
    var currentCity = document.createElement('h2');
    var currentTemp = document.createElement('p');
    var currentWind = document.createElement('p');
    var currentHumidity = document.createElement('p');

    currentCity.textContent = data.name + ' (' + today +') ';
    currentTemp.textContent = 'Temp: ' + data.main.temp +'°F';
    currentWind.textContent = 'Wind: ' + data.wind.speed + 'MPH';
    currentHumidity.textContent = 'Humidity: ' + data.main.humidity;

    cityInfoEl.append(currentCity);
    cityInfoEl.append(currentTemp);
    cityInfoEl.append(currentWind);
    cityInfoEl.append(currentHumidity);
    cityInfoEl.addClass('current-city');
    
};

function getForecast(lat,lon) {

    var forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid=4ff77886755c8b9237b9bb4bb1c1e2bf'

    $.ajax({
        url: forecastUrl,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
        renderForecast(response);
    });
    
};

function renderForecast(data) {
    var currentUVIndex = document.createElement('p');
    currentUVIndex.textContent = 'UV Index: ' + data.current.uvi;
    cityInfoEl.append(currentUVIndex);

    // var day1
    // var day2
    // var day3
    // var day4
    // var day5
};

$('#search-form-btn').on('click', handleSubmitFormSearch)

// init();