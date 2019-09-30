require("dotenv").config();

var axios = require("axios");
var moment = require("moment")
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

console.log("Hey, this is working.")

if (process.argv[2] === "concert-this") {
  var artist = process.argv.slice(3).join(" ")

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log(artist + " is playing at ------> " + '\n');
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

// node liri.js concert-this ariana grande 