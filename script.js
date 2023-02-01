let coffeeDayEl = document.getElementById('coffee-day');
let cityInputEl = document.getElementById('city-input');
let currentDayEl = document.getElementById('current-day');
let cityInfo = document.getElementById('city-info');
let submitBtn = document.getElementById('submit-btn');
let cityInput = document.getElementById('city-input');
let randomDisplay = document.getElementById('random-display');
let randomDiv = document.getElementById('random-coffee');
let randomButton = document.getElementById("random-coffee-button");

function coffeeDrinks() {

    fetch("https://api.sampleapis.com/coffee/hot")

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var randomSelection = document.createElement("a")

            randomDiv.appendChild(randomSelection)
            generateDisplay(data)

        })

}

function generateDisplay(data) {
    let randomInt = Math.floor(Math.random() * 20);
    const coffeeInfo = document.querySelector("#coffeeDesc")

    var titleEL = document.createElement("p")
    var imageEL = document.createElement("p")
    var descriptionEL = document.createElement("p")
    var ul = document.createElement("ul")

    titleEL.innerText = data[randomInt].title
    descriptionEL.innerText = data[randomInt].description
    imageEL.innerText = data[randomInt].image

    coffeeInfo.appendChild(titleEL)
    coffeeInfo.appendChild(imageEL)
    coffeeInfo.appendChild(descriptionEL)
    coffeeInfo.appendChild(ul);

    for (let j = 0; j < data[randomInt].ingredients.length; j++) {
        let currentIng = data[randomInt].ingredients[j]
        let li = document.createElement("li")
        li.appendChild(document.createTextNode(currentIng))
        ul.appendChild(li)

    }
}



randomButton.addEventListener('click', coffeeDrinks);



function cityData(city) {
    console.log(cityInput)
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=5f03a7ebe75741bbe3cd6f91f18b0bd7")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let currentLat = data[0].lat;
            let currentLon = data[0].lon;
            currentDay(currentLat, currentLon);
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
    let tempEl = document.getElementById('temp-display');
    let goodDay = document.getElementById('good-day');

    console.log(todaysInfo)
    tempEl.textContent = 'It is ' + todaysInfo.main.temp + '°F';
    if (todaysInfo.main.temp >= 65) {
        goodDay.textContent = 'Today is a good day for hot coffee!';
    } else if (todaysInfo.main.temp <= 64) {
        goodDay.textContent = 'Today is a good day for iced coffee!';
    }
}

submitBtn.addEventListener('click', function () {
    city = cityInput.value;
    cityData(city);
});
