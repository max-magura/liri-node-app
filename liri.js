require("dotenv").config();

var axios = require("axios");
var moment = require("moment")
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "concert-this") {
  var artist = process.argv.slice(3).join("+")

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log(process.argv.slice(3).join(" ") + " is playing at ------> " + '\n');
    // console.log(response.data)
    for (i = 0; i < response.data.length; i ++) {
      console.log(
        "Venue: " + response.data[i].venue.name + '\n' +
        "Location: " + response.data[i].venue.city + " " + response.data[i].venue.region + " " + response.data[i].venue.country +  '\n' +
        "Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY') +  '\n' +
        "---"
        )
    }
  })
}

if (process.argv[2] === "movie-this") {
  var movie = process.argv.slice(3).join("+")

  if (process.argv[3] === undefined) {
    axios.get("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=trilogy").then(
    function(response) {
    console.log(
      "Title: " + response.data.Title + '\n' +
      "Release Year: " + response.data.Released + '\n' +
      "IMDB Rating: " + response.data.imdbRating + '\n'
      )
      //"Rotten Tomatoes Rating: " + response.data.Ratings[1].Value  + '\n' +
      console.log(
      "Country Movie Premiered: " + response.data.Country + '\n' +
      "Language: " + response.data.Language + '\n' +
      "Plot: " + response.data.Plot + '\n' +
      "Actors: " + response.data.Actors
      )
    })
  }

  else {axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log(
      "Title: " + response.data.Title + '\n' +
      "Release Year: " + response.data.Released + '\n' +
      "IMDB Rating: " + response.data.imdbRating + '\n'
      )
      //"Rotten Tomatoes Rating: " + response.data.Ratings[1].Value  + '\n' +
      console.log(
      "Country Movie Premiered: " + response.data.Country + '\n' +
      "Language: " + response.data.Language + '\n' +
      "Plot: " + response.data.Plot + '\n' +
      "Actors: " + response.data.Actors
      )
  })
  }
}