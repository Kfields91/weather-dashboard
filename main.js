const apiKey = "&appid=2e4ef5fbcc2a67361873c717f682f59d";
const latUrl = "lat=";
const lonUrl = "lon=";
citiesList = JSON.parse(window.localStorage.getItem("history")) || [];
console.log(citiesList);

$(document).ready(function () {
  $("#search").on("click", function(event){
    
    var citySearch = $("#search-term").val();
    $("#day-forecast").empty();
    $(".five-day-forecast").empty();
    event.preventDefault();
    
    // cityWeatherData(citySearch);

    citiesList.push(citySearch);
    window.localStorage.setItem("citiesList", JSON.stringify(citiesList));
    // for (var i = 0; i < citiesList.length; i++) {
    //   cityListAdd(citiesList[i]);
      
    // }
    cityListAdd(citiesList[citiesList.length -1]);
    if (citiesList.length > 0) {
      cityWeatherData(citiesList[citiesList.length -1]);

      console.log(citiesList[citiesList.length -1]);
    }
    console.log(citySearch);
    console.log(citiesList);
    
  })
  
  function cityListAdd(citiesList){;
    var ulEl = $(".cities-list");
    ulEl.empty();
    var cityName = $("<li>").text(citiesList);
    ulEl.append(cityName);

  }
  $(".cities-list").on("click", "li", function(event){
    $("#day-forecast").empty();
    $(".five-day-forecast").empty();
    event.preventDefault(); 
    var citySearch = $("#search-term").val();
    cityListAdd($(this).text()); 
    cityWeatherData($(this).text());
    console.log(citySearch);
    })
  function cityWeatherData(citySearch){
    const url = "https://api.openweathermap.org/data/2.5/weather?";
    const qParam = "q=";
    const queryURL = url + qParam + citySearch + "&units=imperial" + apiKey;
    // first ajax call
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response){
      console.log(response)
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      // var city = response.name;
      var latCoord = latUrl + lat;
      console.log(latCoord);
      var lonCoord = lonUrl + lon;
      console.log(lonCoord);
      var DayforecastDiv = $("#day-forecast");
      var cityNameDisplay = $("<p>").text(response.name + response.dt);
      var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
      DayforecastDiv.append(cityNameDisplay);
      cityNameDisplay.append(icon);
      fiveDayForecastURL();
      

      function fiveDayForecastURL(){
        const onecallUrl = "https://api.openweathermap.org/data/2.5/";
        const oneCall = "onecall?";
        // coordinates();
        var fiveDayForecastURL = onecallUrl + oneCall + latCoord + "&" + lonCoord + "&units=imperial" + apiKey;
        console.log(fiveDayForecastURL); 
        $.ajax({
          url: fiveDayForecastURL,
          method: "GET"
        }).then(function (response){
          // console.log(response);
          var temp = $("<p>").text("Temparature: " + Math.floor(response.current.temp) + " F");
          DayforecastDiv.append(temp);
          var humidity = $("<p>").text("Humidity " + response.current.humidity + " %");
          DayforecastDiv.append(humidity);
          var windSpeed = $("<p>").text("Wind Speed " + response.current.wind_speed + "MPH");
          DayforecastDiv.append(windSpeed);
          var uvI = (Number(JSON.stringify(response.current.uvi)));
          uvIndex = $("<p>").text("UV-Index: " + uvI);
          DayforecastDiv.append(uvIndex)
          uvIndex.addClass("");
          // console.log(typeof(Number(JSON.stringify(uvIndex))));
          if(Number(JSON.stringify(uvI < 2))){
            console.log(typeof(uvIndex));
            uvIndex.addClass("green");
          }
          if(uvI < 7.0 || uvI > 2.01){
            uvIndex.addClass("yellow");
          }
          if(uvI > 7.99){
            uvIndex.addClass("red");
          }
          // console.log(this);
          var fiveDayForecastDiv = $(".five-day-forecast");
          var headline = $("<h3>").text("5-Day Forecast");
          fiveDayForecastDiv.append(headline);
          for (i = 1; i < 6; i++) {
            var forecastDiv = $("<div>").attr("class", "five-day");
            fiveDayForecastDiv.append(forecastDiv);
            var date = $("<p>").text(response.daily[i].dt);
            let icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.daily[i].weather[0].icon + "@2x.png");
            let temp = $("<p>").text("Temp: " + Math.floor(response.daily[i].temp.max) + "F");
            let humidity2 = $("<p>").text("Humanity:" + Math.floor(response.daily[i].humidity) + "%");
            forecastDiv.append(date, icon, temp, humidity2);
      
            
          }// set up local storage?
        })
      }
    });
  }
  function cityListAdd(city){;
    var ulEl = $(".cities-list");
    var cityName = $("<li>").text(city);
    ulEl.append(cityName);
    // console.log(citySearch);
  }
  
  
})
