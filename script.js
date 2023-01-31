let coffeeDayEl = document.getElementById('coffee-day');
let cityInputEl = document.getElementById('city-input');
let currentDayEl = document.getElementById('current-day');
let cityInfo = document.getElementById('city-info');
let randomDisplay = document.getElementById('random-display')
let randomDiv = document.getElementById('random-coffee')


function coffeeDrinks() {
    randomNumber()
    fetch("https://api.sampleapis.com/coffee/hot")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var i = randomInt;
            var randomSelection = document.createElement("a")
            randomSelection.content = data[i]
            randomDiv.appendChild(randomSelection)




            generateDisplay(data)
        })

}
function generateDisplay(data) {
    const coffeeInfo = document.querySelector("#coffeeDesc")

    for (let i = 0; i < data.length; i++) {
        var titleEL = document.createElement("p")
        var imageEL = document.createElement("div")
        var ul = document.createElement("ul")
        var descriptionEL = document.createElement("section")
       coffeeInfo.appendChild(ul)

        for (let j = 0; j < data[i].ingredients.length; j++) {
            let currentIng = data[i].ingredients[j]
            let li = document.createElement("li")
            li.appendChild(document.createTextNode(currentIng))
            ul.appendChild(li)

        }

        coffeeInfo.appendChild(titleEL)
        coffeeInfo.appendChild(imageEL)
        coffeeInfo.appendChild(descriptionEL)
        
    }

}

function randomNumber() {
    randomInt = Math.floor(Math.random() * 20);
    return randomInt
}

coffeeDrinks();

function cityData(city) {
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let currentLat = data[0].lat
            let currentLon = data[0].lon
            currentDay(currentLat, currentLon)
            currentForecast(currentLat, currentLon);
        })
}

function currentDay(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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
