require("dotenv").config();
var fs = require("fs")
var axios = require("axios");
var moment = require("moment")
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

console.log('\n')

var artist = process.argv.slice(3).join("+")
var movie = process.argv.slice(3).join("+")
var song = process.argv.slice(3).join("+")

function getConcert (artist) {
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

function getMovie (movie) {
  if (process.argv[3] === undefined) {
    axios.get("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=trilogy").then(

    function(response) {

      if (response.data.Ratings < 1 || response.data.Ratings == undefined) {
        rtRating = "Sorry, no Rotten Tomatoes rating is given."
      }
      else {
       rottenRating = response.data.Ratings.filter(entry => entry.Source === "Rotten Tomatoes") 
       rtRating = rottenRating[0].Value
      }

      console.log(
      "Title: " + response.data.Title + '\n' +
      "Release Year: " + response.data.Year + '\n' +
      "IMDB Rating: " + response.data.imdbRating + '\n' +
      "Rotten Tomatoes Rating: " + rtRating  + '\n' +
      "Country Movie Premiered: " + response.data.Country + '\n' +
      "Language: " + response.data.Language + '\n' +
      "Plot: " + response.data.Plot + '\n' +
      "Actors: " + response.data.Actors + '\n'
      )
    })


  }

  else {axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
  
  function (response) {

    // console.log(response.data)
    var rottenRating
    var rtRating

    if (response.data.Ratings < 1 || response.data.Ratings == undefined) {
      rtRating = "Sorry, no Rotten Tomatoes rating is given."
    }
    else {
     rottenRating = response.data.Ratings.filter(entry => entry.Source === "Rotten Tomatoes") 
     rtRating = rottenRating[0].Value
    }
  
    console.log(
      "Title: " + response.data.Title + '\n' +
      "Release Year: " + response.data.Year + '\n' +
      "IMDB Rating: " + response.data.imdbRating + '\n' +
      "Rotten Tomatoes Rating: " + rtRating  + '\n' +
      "Country Movie Premiered: " + response.data.Country + '\n' +
      "Language: " + response.data.Language + '\n' +
      "Plot: " + response.data.Plot + '\n' +
      "Actors: " + response.data.Actors + '\n'
      )
  })
  }

}

function getSong (song) {
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

if (process.argv[2] === "concert-this") {
  getConcert (artist)
} 

if (process.argv[2] === "movie-this") {
  getMovie (movie)
}

if (process.argv[2] === "spotify-this-song") {
  getSong (song)
}

if (process.argv[2] === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    
    var dataArray = []
    dataArray = data.split(",")
    console.log(dataArray)

    var artist = dataArray[1]
    var movie = dataArray[1]
    var song = dataArray[1]

    if (dataArray[0] === "concert-this") {
      process.argv[3] = artist
      getConcert (artist)
    } 

    if (dataArray[0] === "movie-this") {
      process.argv[3] = movie
      getMovie (movie)
    }
    
    if (dataArray[0] === "spotify-this-song") {
      process.argv[3] = song
      getSong(song)
    }

   })

}
