// Define global variables

var yourCities = [];

var key = "c0bfbe029f5184838d438a684303b5b2";
var units = "&units=imperial&appid=";

// Function to search city of interest

function citySearch() {

    $("#cityView").empty();

    for (var i = 0; i < yourCities.length; i++) {

        var searchHistory = $("<button>");
        searchHistory.addClass("newCityButton");
        searchHistory.attr("yourCityInput", yourCities[i]);
        searchHistory.text(yourCities[i]);
        $("#cityView").append(searchHistory);
    }
}

$("#searchButton").on("click", function (event) {
    event.preventDefault();

    // Push cityInput to empty array youCity.
    var cityInput = $("#yourCities").val();
    yourCities.push(cityInput);


    // url for current weather
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + units + key;

    $.ajax({
        url: weatherURL,
        type: "GET",
    }).then(function (response) {
        // Print weather information
        console.log(response);
        console.log(response.weather[0].icon);
        console.log(response.weather[0].main);
        console.log(response.main.temp + "\u00B0F");
        console.log(response.main.humidity + "%");
        console.log(response.wind.speed + " MPH");
        console.log(response.weather[0].description);

        $(".city").html("<h1>" + response.name + " Today</h1>");
        $(".temp").text("Temp: " + response.main.temp + "\u00B0F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");

        // url for uv information
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;

        $.ajax({
            url: uvURL,
            type: "GET",
        }).then(function (response) {
            // Print UV information
            console.log(response);
            console.log("UV index: " + response.value);
        });

        // url for forecast for 5 days
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + key;

        $.ajax({
            url: forecastURL,
            type: "GET",
        }).then(function (response) {
            // Print dates and temps for next five days
            console.log(response);
            console.log(response.list[1].dt_txt);
            console.log("Temp: " + response.list[1].main.temp);
            console.log("Humidity: " + response.list[1].main.humidity);
            console.log("Wind Speed: " + response.list[1].wind.speed);
            console.log("------------------------------")

            console.log(response.list[9].dt_txt);
            console.log("Temp: " + response.list[9].main.temp);
            console.log("Humidity: " + response.list[9].main.humidity);
            console.log("Wind Speed: " + response.list[9].wind.speed);
            console.log("------------------------------")

            console.log(response.list[17].dt_txt);
            console.log("Temp: " + response.list[17].main.temp);
            console.log("Humidity: " + response.list[17].main.humidity);
            console.log("Wind Speed: " + response.list[17].wind.speed);
            console.log("------------------------------")

            console.log(response.list[25].dt_txt);
            console.log("Temp: " + response.list[25].main.temp);
            console.log("Humidity: " + response.list[25].main.humidity);
            console.log("Wind Speed: " + response.list[25].wind.speed);
            console.log("------------------------------")

            console.log(response.list[33].dt_txt);
            console.log("Temp: " + response.list[33].main.temp);
            console.log("Humidity: " + response.list[33].main.humidity);
            console.log("Wind Speed: " + response.list[33].wind.speed);
            console.log("------------------------------")

            $(".dateOne").text(response.list[1].dt_txt);
            $(".tempOne").text("Temp: " + response.list[1].main.temp + "\u00B0F");
            $(".humidityOne").text("Humidity: " + response.list[1].main.humidity + "%");
            $(".windOne").text("Wind Speed: " + response.list[1].wind.speed + " MPH");

            $(".dateTwo").text(response.list[9].dt_txt);
            $(".tempTwo").text("Temp: " + response.list[9].main.temp + "\u00B0F");
            $(".humidityTwo").text("Humidity: " + response.list[9].main.humidity + "%");
            $(".windTwo").text("Wind Speed: " + response.list[9].wind.speed + " MPH");

            $(".dateThree").text(response.list[17].dt_txt);
            $(".tempThree").text("Temp: " + response.list[17].main.temp + "\u00B0F");
            $(".humidityThree").text("Humidity: " + response.list[17].main.humidity + "%");
            $(".windThree").text("Wind Speed: " + response.list[17].wind.speed + " MPH");

            $(".dateFour").text(response.list[25].dt_txt);
            $(".tempFour").text("Temp: " + response.list[25].main.temp + "\u00B0F");
            $(".humidityFour").text("Humidity: " + response.list[25].main.humidity + "%");
            $(".windFour").text("Wind Speed: " + response.list[25].wind.speed + " MPH");

            $(".dateFive").text(response.list[33].dt_txt);
            $(".tempFive").text("Temp: " + response.list[33].main.temp + "\u00B0F");
            $(".humidityFive").text("Humidity: " + response.list[33].main.humidity + "%");
            $(".windFive").text("Wind Speed: " + response.list[33].wind.speed + " MPH");

        });

    });

    citySearch();
    console.log(yourCities);

    // Button to erase input from local storage
    $("#clearHistory").on("click", function () {
        console.log("Clear button pressed");
        $(".city").empty();
        $(".wind").empty();
        $(".humidity").empty();
        $(".temp").empty();
        $(".cityTable").empty();
    });
});

