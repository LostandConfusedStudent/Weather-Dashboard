function initiate() {
    // Define global variables
    const m = moment();
    var startDate = m.format("L");

    var input = document.getElementById("yourCities");
    var searchButton = document.getElementById("searchButton");
    var clearHistory = document.getElementById("clearHistory");
    var history = document.getElementById("cityView");
    var yourCities = JSON.parse(localStorage.getItem("yourCities")) || [];

    searchButton.addEventListener("click", function () {
        var searchInput = input.value;
        citySearch(searchInput);
        yourCities.push(searchInput);
        localStorage.setItem("yourCities", JSON.stringify(yourCities));
        renderyourCities();
    })

    clearHistory.addEventListener("click", function () {
        yourCities = [];
        renderyourCities();
    })

    function renderyourCities() {
        history.innerHTML = "";
        for (let i = 0; i < yourCities.length; i++) {
            var historyCity = document.createElement("input");
            historyCity.setAttribute("type", "text");
            historyCity.setAttribute("readonly", true);
            historyCity.setAttribute("value", yourCities[i]);
            historyCity.addEventListener("click", function () {
                citySearch(historyCity.value);
            })
            history.append(historyCity);
        }
    }

    renderyourCities();
    if (yourCities.length > 0) {
        citySearch(yourCities[yourCities.length - 1]);
    }

    var key = "c0bfbe029f5184838d438a684303b5b2";
    var units = "&units=imperial&appid=";

    // Function to search city of interest

    function citySearch() {
        // Push cityInput to empty array youCity.
        var cityInput = $("#yourCities").val();


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

            var iconCode = response.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

            $(".city").html(response.name + " (" + startDate + ")");
            $("#wicon").attr("src", iconURL);
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

                if (response.value >= 0 && response.value <=2) {
                    document.getElementById("index").style.backgroundColor = "green";
                    
                } else if (response.value > 2 && response.value <= 5) {
                    document.getElementById("index").style.backgroundColor = "yellow";

                } else if (response.value > 5 && response.value <= 7) {
                    document.getElementById("index").style.backgroundColor = "orange";

                } else {
                    document.getElementById("index").style.backgroundColor = "red";
                }

                $("#index").text("UV index: " + response.value.toFixed(2));

            });

            // url for forecast for 5 days
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&units=imperial&appid=" + key;

            $.ajax({
                url: forecastURL,
                type: "GET",
            }).then(function (response) {

                console.log(response);

                var iconCode1 = response.list[1].weather[0].icon;
                var iconURL1 = "http://openweathermap.org/img/wn/" + iconCode1 + "@2x.png";

                var iconCode2 = response.list[9].weather[0].icon;
                var iconURL2 = "http://openweathermap.org/img/wn/" + iconCode2 + "@2x.png";

                var iconCode3 = response.list[17].weather[0].icon;
                var iconURL3 = "http://openweathermap.org/img/wn/" + iconCode3 + "@2x.png";

                var iconCode4 = response.list[25].weather[0].icon;
                var iconURL4 = "http://openweathermap.org/img/wn/" + iconCode4 + "@2x.png";

                var iconCode5 = response.list[33].weather[0].icon;
                var iconURL5 = "http://openweathermap.org/img/wn/" + iconCode5 + "@2x.png";


                var date1 = moment(startDate).add(1, "days").format("MM/DD/YYYY");
                $(".dateOne").text(date1);
                $("#wicon1").attr("src", iconURL1);
                $(".tempOne").text("Temp: " + response.list[1].main.temp + "\u00B0F");
                $(".humidityOne").text("Humidity: " + response.list[1].main.humidity + "%");

                var date2 = moment(startDate).add(2, "days").format("MM/DD/YYYY");
                $(".dateTwo").text(date2);
                $("#wicon2").attr("src", iconURL2);
                $(".tempTwo").text("Temp: " + response.list[9].main.temp + "\u00B0F");
                $(".humidityTwo").text("Humidity: " + response.list[9].main.humidity + "%");

                var date3 = moment(startDate).add(3, "days").format("MM/DD/YYYY");
                $(".dateThree").text(date3);
                $("#wicon3").attr("src", iconURL3);
                $(".tempThree").text("Temp: " + response.list[17].main.temp + "\u00B0F");
                $(".humidityThree").text("Humidity: " + response.list[17].main.humidity + "%");

                var date4 = moment(startDate).add(4, "days").format("MM/DD/YYYY");
                $(".dateFour").text(date4);
                $("#wicon4").attr("src", iconURL4);
                $(".tempFour").text("Temp: " + response.list[25].main.temp + "\u00B0F");
                $(".humidityFour").text("Humidity: " + response.list[25].main.humidity + "%");

                var date5 = moment(startDate).add(5, "days").format("MM/DD/YYYY");
                $(".dateFive").text(date5);
                $("#wicon5").attr("src", iconURL5);
                $(".tempFive").text("Temp: " + response.list[33].main.temp + "\u00B0F");
                $(".humidityFive").text("Humidity: " + response.list[33].main.humidity + "%");

            });

        });
    }


    // Button to erase input from local storage
    $("#clearHistory").on("click", function () {
        console.log("Clear button pressed");
        $(".city").empty();
        $(".wind").empty();
        $(".humidity").empty();
        $(".temp").empty();
        $("#cityView").empty();
        $("#index").empty();

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
};

initiate();