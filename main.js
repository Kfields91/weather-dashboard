const url = "https://api.openweathermap.org/data/2.5/weather?";
const qParam = "q=";
// don't forget "&" between parts
const oneCall = "onecall?";
const latUrl = "lat=";
const lonUrl = "lon=";
const excludeUrl = "exclude=";
const apiKey = "&appid=2e4ef5fbcc2a67361873c717f682f59d";
const uiIndex = "uvi?";
const uiIndexCall = url + "uvi?" + "&" + latUrl + "&" + lonUrl + apiKey;

// url + oneCall + latUrl + "47.608013&" + lonUrl + "-122.335167" + apiKey;
// console.log(queryURL);

// https://api.openweathermap.org/data/2.5/weather?q=&appid={API key}
// http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// ready document here

// var citySearch = $("wherever search input is") .... on click of submit button

// run Ajax call after adding query url with user variable

// const queryURL = url + qParam + citySearch + apiKey;
// testing API connection ***PASSED****
const queryURL = url + qParam + "Seattle" + apiKey;
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
console.log(this);

var y = $("search");
