let coffeeDayEl = document.getElementById('coffee-day');
let cityInputEl = document.getElementById('city-input');
let currentDayEl = document.getElementById('current-day');
let cityInfo = document.getElementById('city-info');


function coffeeDrinks () {
    fetch("https://api.sampleapis.com/coffee/hot") 
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        showCoffee(data);
        console.log(data);
    })
    
}

function showCoffee (data) {
    
}

coffeeDrinks();

function cityData(city) {
 fetch("https://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        let currentLat = data[0].lat
        let currentLon = data[0].lon
        currentDay(currentLat, currentLon)
        currentForecast(currentLat, currentLon);
    })
}

function currentDay(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        let todaysInfo = data;
        displayToday(todaysInfo);
    })
}
  
function displayToday(todaysInfo) {
    let date = dayjs().format('M/D/YYYY');
    let tempEl = document.getElementById('temp');
    
    let city = cityInputEl.value;
    cityInfo.textContent = city + '   ' + date;
    tempEl.textContent = 'Temp: ' + todaysInfo.main.temp + '°F';
}
