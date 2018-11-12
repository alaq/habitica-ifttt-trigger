// server.js
// where your node app starts

// init project
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Show the homepage
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));

// Handle requests from IFTTT
app.post("/", function (request, response) {
  console.log("Request received from IFTTT");
  console.log("Data: " + JSON.stringify(request.body));
  
  if (process.env.GLITCH_APP_KEY === request.body.key) {
    console.log("Calling Habitica API...");
    addHabiticaToDo(request.body.title);
    console.log("Done triggering.");
  }
  else {
    console.log("Bad key, exiting.");   
  }
  response.end();  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


function addHabiticaToDo(title){
  // Make a request to Habitica using the user ID and API key from .env and the title from IFTTT
  request({
    headers: {
      'x-api-user': process.env.HABITICA_USER,
      'x-api-key': process.env.HABITICA_API_KEY
    },
    uri: 'https://habitica.com/api/v3/tasks/user',
    body: { text: title, type: 'todo' },
    json: true,
    method: 'POST'
  }, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       console.log(body); // Show the response from Habitica
     }
    else {
      console.log(response.statusCode);
      console.log(body);
    }
  });
}