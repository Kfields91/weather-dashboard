const url = "https://api.openweathermap.org/data/2.5/weather?";
const qParam = "q=";
const apiKey = "&appid=2e4ef5fbcc2a67361873c717f682f59d";
const latUrl = "lat=";
const lonUrl = "lon=";

$(document).ready(function () {
  
  $("#search").on("click", function(event){
    
    event.preventDefault(); 
 
    var citySearch = $("#search-term").val();

    function cityWeatherData() {
     const queryURL = url + qParam + citySearch + apiKey;
      console.log(event);
      $.ajax({
      url: queryURL,
      method: "GET",
      }).then(function (forecast) {
      console.log(forecast);
      console.log(forecast.name);
      console.log(Math.floor(forecast.main.temp * 1.8 - 459.67) + " F");
      console.log(forecast.main.humidity);
      console.log(forecast.wind.speed);
      console.log(forecast.coord.lat, forecast.coord.lon);
      // console.log(forecast.weather[0].icon);
      var ulEl = $(".cities-list");
      var cityName = $("<li>").text(forecast.name);
      ulEl.append(cityName);
      
      var DayforecastDiv = $("#day-forecast");
      var cityNameDisplay = $("<p>").text(forecast.name + "  date  " + "  icon");
      var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + forecast.weather[0].icon + "@2x.png");
      DayforecastDiv.append(cityNameDisplay,icon);
      var temp = $("<p>").text("Temparature: " + Math.floor(forecast.main.temp * 1.8 - 459.67) + " F");
      DayforecastDiv.append(temp);
      var humidity = $("<p>").text("Humidity " + forecast.main.humidity + " %");
      DayforecastDiv.append(humidity);
      var windSpeed = $("<p>").text("Wind Speed " + forecast.wind.speed);
      DayforecastDiv.append(windSpeed);
      lat = forecast.coord.lat;
      lon = forecast.coord.lon
        coordinates();
    }); 
    } cityWeatherData();
    function coordinates(){
      var latCoord = latUrl + lat;
      console.log(latCoord);
      var lonCoord = lonUrl + lon;
      console.log(lonCoord);
      fiveDayForecast();

      function fiveDayForecast(){
        const onecallUrl = "https://api.openweathermap.org/data/2.5/";
        const oneCall = "onecall?";
        var fiveDayURL = onecallUrl + oneCall + latCoord + "&" + lonCoord + apiKey;
        console.log(fiveDayURL);
        $.ajax({
          url: fiveDayURL,
          method: "GET"
        }).then(function (response){
          console.log(response);
        })
      }
    }
    
    
    
    
    
    
    
    
    
    
    
  })
  
})
    // // function uvIndex(){
    // //   const url2 = "http://api.openweathermap.org/data/2.5/"
    // //   const latUrl = "lat=" + lat;
    // //   const lonUrl = "lon=" + lon;
    // //   const uiIndex = "uvi?";
  
    // //   const uvIndexCall = url2 + uiIndex + latUrl + "&" + lonUrl + apiKey;
    // //   console.log(uvIndexCall);
  
    // }
// function buildQueryUrl() {
// don't forget "&" between parts
// const oneCall = "onecall?";
// const excludeUrl = "exclude=";
// url + oneCall + latUrl + "47.608013&" + lonUrl + "-122.335167" + apiKey;

// https://api.openweathermap.org/data/2.5/weather?q=&appid={API key}
// http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/onecall?lat=47.61&lon=-122.33&appid=2e4ef5fbcc2a67361873c717f682f59d