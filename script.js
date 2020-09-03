// Define global variables
var yourCity = [];

var key = "c0bfbe029f5184838d438a684303b5b2";
var units = "&units=imperial&appid=";

// Function to search city of interest

function citySearch() {

    $("#cityView").empty();

    for (var i = 0; i < yourCity.length; i++) {

        var a = $("<li>");
        a.addClass("city");
        a.attr("yourCityInput", yourCity[i]);
        a.text(yourCity[i]);
        $("#cityView").append(a);
    }
}

$("#searchButton").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#yourCity").val();
    yourCity.push(cityInput);



    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" +  cityInput + units + key;

    $.ajax({
        url: weatherURL,
        type: "GET",
    }).then(function (response) {
        // Print weather information
        console.log(response);
        console.log(response.weather[0].main);
        console.log(response.main.temp + "\u00B0 Fahrenheit");
        console.log(response.main.humidity + "%");
        console.log(response.wind.speed + " miles per hour");


        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;

        $.ajax({
            url: uvURL,
            type: "GET",
        }).then(function (response) {
            // Print UV information
            console.log(response);
            console.log("UV index: " + response.value);
        });

        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + key;

        $.ajax({
            url: forecastURL,
            type: "GET",
        }).then(function(response) {
            // Print dates and temperatures for next five days
            console.log(response);
            console.log(response.list[2].dt_txt);
            console.log(response.list[2].main.temp);
            console.log(response.list[10].dt_txt);
            console.log(response.list[10].main.temp);
            console.log(response.list[18].dt_txt);
            console.log(response.list[18].main.temp);
            console.log(response.list[26].dt_txt);
            console.log(response.list[26].main.temp);
            console.log(response.list[34].dt_txt);
            console.log(response.list[34].main.temp);
        });

    });

    citySearch();
    console.log(yourCity);

});