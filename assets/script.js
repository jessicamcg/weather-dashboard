
    // 4ff77886755c8b9237b9bb4bb1c1e2bf

var cityNameInputForm = $('#input-city-name');
var cityInfoEl = $('#city-card');
var today = moment();

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

    var currentCity = document.createElement('h2');
    var currentTemp = document.createElement('p');
    var currentWind = document.createElement('p');
    var currentHumidity = document.createElement('p');

    currentCity.textContent = data.name + ' (' + today.format("L") +') ';
    currentTemp.textContent = 'Temp: ' + data.main.temp +'°F';
    currentWind.textContent = 'Wind: ' + data.wind.speed + 'MPH';
    currentHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';

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
        renderForecast(response);
    });
    
};

function renderForecast(data) {
    console.log(data);
    var currentUVIndex = document.createElement('p');
    currentUVIndex.textContent = 'UV Index: ' + data.current.uvi;
    cityInfoEl.append(currentUVIndex);
    
    $('#5-day-forecast').text('5-Day-Forecast');

    for (var i=1; i<6; i++) {
        var futureDate = document.createElement('h6')
        var icon = document.createElement('img')
        var futureTemp = document.createElement('p');
        var futureWind = document.createElement('p');
        var futureHumidity = document.createElement('p');        
        var iconCode = data.daily[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        icon.setAttribute('src',iconUrl)

        
        futureDate.textContent = today.add(1, 'days').format('L');
        futureTemp.textContent = 'Temp: ' +  data.daily[i].temp.day +'°F';
        futureWind.textContent =  'Wind: ' + data.daily[i].wind_speed + 'MPH';
        futureHumidity.textContent = 'Humidity: ' + data.daily[i].humidity + '%';
        
        $('#day-'+i).append(futureDate);
        $('#day-'+i).append(icon);
        $('#day-'+i).append(futureTemp);
        $('#day-'+i).append(futureWind);
        $('#day-'+i).append(futureHumidity);
        
    };
};

$('#search-form-btn').on('click', handleSubmitFormSearch)

// init();