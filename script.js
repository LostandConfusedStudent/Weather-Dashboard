// Define variables

// Function to search city of interest

function search() {
    const key = "c0bfbe029f5184838d438a684303b5b2";

    // Test url

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bellevue&units=imperial&appid=" + key;
    
    $.ajax({
        url: queryURL,
        type: "GET",
    }).then(function(response) {
        // Print weather information
        console.log(response);
        console.log(response.weather[0].main);
        console.log(response.main.temp + "\u00B0 Fahrenheit");
        console.log(response.main.humidity + "%");
        console.log(response.wind.speed + " miles per hour");


        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;

        $.ajax({
            url: uvURL,
            type: "GET",
        }).then(function(response) {
            // Print UV information
            // console.log(response);
            console.log("UV index: " + response.value);
        });
    });
};

search();
// Function that displays city of interest