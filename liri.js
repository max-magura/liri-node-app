require("dotenv").config();

var axios = require("axios");
var moment = require("moment")
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

console.log("I'm working!"+  '\n' + "---" + '\n')

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

if (process.argv[2] === "spotify-this-song") {
  var song = process.argv.slice(3).join("+")

  if (process.argv[3] === undefined) {
    spotify.search({ type: 'track', query: 'the sign'} , function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log(
        "Artist: " + data.tracks.items[5].artists[0].name + '\n' +
        "Song Name: " + data.tracks.items[5].name +  '\n' +
        "Album Name: " + data.tracks.items[5].album.name +  '\n' +
        "Spotify Preview Link: " + data.tracks.items[5].external_urls.spotify +  '\n' +
        "---"
        )
  
      
      })
  }

  else {spotify.search({ type: 'track', query: song, limit: 5}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    for (i = 0; i < data.tracks.items.length; i ++) {
      console.log(
        "Artist: " + data.tracks.items[i].artists[0].name + '\n' +
        "Song Name: " + data.tracks.items[i].name +  '\n' +
        "Album Name: " + data.tracks.items[i].album.name +  '\n' +
        "Spotify Preview Link: " + data.tracks.items[i].external_urls.spotify +  '\n' +
        "---"
        )
    }
    })
  }
}



