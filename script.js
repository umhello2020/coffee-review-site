let coffeeDayEl = document.getElementById('coffee-day');

function coffeeDrinks () {
    fetch("https://api.sampleapis.com/coffee/hot") 
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        showCoffee(data);
    })
}

function showRandomCoffee (data) {
    
}

coffeeDrinks();