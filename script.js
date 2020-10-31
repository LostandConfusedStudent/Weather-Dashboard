// Define global variables

var yourCity = [];

var key = "c0bfbe029f5184838d438a684303b5b2";
var units = "&units=imperial&appid=";

// Function to search city of interest

function citySearch() {

    $("#cityView").empty();

    for (var i = 0; i < yourCity.length; i++) {

        var searchHistory = $("<button>");
        searchHistory.addClass("newCityButton");
        searchHistory.attr("yourCityInput", yourCity[i]);
        searchHistory.text(yourCity[i]);
        $("#cityView").append(searchHistory);
    }
}

$("#searchButton").on("click", function (event) {
    event.preventDefault();

    var cityInput = $("#yourCity").val();
    yourCity.push(cityInput);


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
        console.log(response.main.temp + "\u00B0 Fahrenheit");
        console.log(response.main.humidity + "%");
        console.log(response.wind.speed + " miles per hour");
        console.log(response.weather[0].description);

        // city
        // wind
        // humidity
        // temp
        $(".city").html("<h1>" + response.name + " Today</h1>");
        $(".temp").text("Temperature: " + response.main.temp + "\u00B0 Fahrenheit");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind Speed: " + response.wind.speed + " miles per hour");

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
            // Print dates and temperatures for next five days
            console.log(response);
            console.log("Date: " + response.list[1].dt_txt);
            console.log("Temperature: " + response.list[1].main.temp);
            console.log("Humidity: " + response.list[1].main.humidity);
            console.log("Wind Speed: " + response.list[1].wind.speed);
            console.log("------------------------------")

            console.log("Date: " + response.list[9].dt_txt);
            console.log("Temperature: " + response.list[9].main.temp);
            console.log("Humidity: " + response.list[9].main.humidity);
            console.log("Wind Speed: " + response.list[9].wind.speed);
            console.log("------------------------------")

            console.log("Date: " + response.list[17].dt_txt);
            console.log("Temperature: " + response.list[17].main.temp);
            console.log("Humidity: " + response.list[17].main.humidity);
            console.log("Wind Speed: " + response.list[17].wind.speed);
            console.log("------------------------------")
            
            console.log("Date: " + response.list[25].dt_txt);
            console.log("Temperature: " + response.list[25].main.temp);
            console.log("Humidity: " + response.list[25].main.humidity);
            console.log("Wind Speed: " + response.list[25].wind.speed);
            console.log("------------------------------")

            console.log("Date: " + response.list[33].dt_txt);
            console.log("Temperature: " + response.list[33].main.temp);
            console.log("Humidity: " + response.list[33].main.humidity);
            console.log("Wind Speed: " + response.list[33].wind.speed);
            console.log("------------------------------")

            $(".dateOne").text("Date: " + response.list[1].dt_txt);
            $(".tempOne").text("Temperature: " + response.list[1].main.temp + "\u00B0 Fahrenheit");
            $(".humidityOne").text("Humidity: " + response.list[1].main.humidity + "%");
            $(".windOne").text("Wind Speed: " + response.list[1].wind.speed + " miles per hour");

            $(".dateTwo").text("Date: " + response.list[9].dt_txt);
            $(".tempTwo").text("Temperature: " + response.list[9].main.temp + "\u00B0 Fahrenheit");
            $(".humidityTwo").text("Humidity: " + response.list[9].main.humidity + "%");
            $(".windTwo").text("Wind Speed: " + response.list[9].wind.speed + " miles per hour");

            $(".dateThree").text("Date: " + response.list[17].dt_txt);
            $(".tempThree").text("Temperature: " + response.list[17].main.temp + "\u00B0 Fahrenheit");
            $(".humidityThree").text("Humidity: " + response.list[17].main.humidity + "%");
            $(".windThree").text("Wind Speed: " + response.list[17].wind.speed + " miles per hour");

            $(".dateFour").text("Date: " + response.list[25].dt_txt);
            $(".tempFour").text("Temperature: " + response.list[25].main.temp + "\u00B0 Fahrenheit");
            $(".humidityFour").text("Humidity: " + response.list[25].main.humidity + "%");
            $(".windFour").text("Wind Speed: " + response.list[25].wind.speed + " miles per hour");

            $(".dateFive").text("Date: " + response.list[33].dt_txt);
            $(".tempFive").text("Temperature: " + response.list[33].main.temp + "\u00B0 Fahrenheit");
            $(".humidityFive").text("Humidity: " + response.list[33].main.humidity + "%");
            $(".windFive").text("Wind Speed: " + response.list[33].wind.speed + " miles per hour");

        });

    });

    citySearch();
    console.log(yourCity);

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

