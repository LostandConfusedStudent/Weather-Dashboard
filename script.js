// Define global variables

var yourCities = [];
const m = moment();
var startDate = m.format("L");

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

        $(".city").html(response.name + " (" + startDate + ")");
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

            $(".index").text("UV index: " + response.value.toFixed(2));

        });

        // url for forecast for 5 days
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + key;

        $.ajax({
            url: forecastURL,
            type: "GET",
        }).then(function (response) {

            var date1 = moment(startDate).add(1, "days").format("MM/DD/YYYY");
            $(".dateOne").text(date1);
            $(".tempOne").text("Temp: " + response.list[1].main.temp + "\u00B0F");
            $(".humidityOne").text("Humidity: " + response.list[1].main.humidity + "%");

            var date2 = moment(startDate).add(2, "days").format("MM/DD/YYYY");
            $(".dateTwo").text(date2);
            $(".tempTwo").text("Temp: " + response.list[9].main.temp + "\u00B0F");
            $(".humidityTwo").text("Humidity: " + response.list[9].main.humidity + "%");

            var date3 = moment(startDate).add(3, "days").format("MM/DD/YYYY");
            $(".dateThree").text(date3);
            $(".tempThree").text("Temp: " + response.list[17].main.temp + "\u00B0F");
            $(".humidityThree").text("Humidity: " + response.list[17].main.humidity + "%");

            var date4 = moment(startDate).add(4, "days").format("MM/DD/YYYY");
            $(".dateFour").text(date4);
            $(".tempFour").text("Temp: " + response.list[25].main.temp + "\u00B0F");
            $(".humidityFour").text("Humidity: " + response.list[25].main.humidity + "%");

            var date5 = moment(startDate).add(5, "days").format("MM/DD/YYYY");
            $(".dateFive").text(date5);
            $(".tempFive").text("Temp: " + response.list[33].main.temp + "\u00B0F");
            $(".humidityFive").text("Humidity: " + response.list[33].main.humidity + "%");

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
        $(".index").empty();

        $(".dateOne").empty();
        $(".tempOne").empty();
        $(".humidityOne").empty();

        $(".dateTwo").empty();
        $(".tempTwo").empty();
        $(".humidityTwo").empty();

        $(".dateThree").empty();
        $(".tempThree").empty();
        $(".humidityThree").empty();

        $(".dateFour").empty();
        $(".tempFour").empty();
        $(".humidityFour").empty();
        
        $(".dateFive").empty();
        $(".tempFive").empty();
        $(".humidityFive").empty();
    });
});

