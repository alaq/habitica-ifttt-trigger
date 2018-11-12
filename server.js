const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Get the Id from IFTTT Maker URL
if(!process.env.IFTTT_MAKER_URL)
  console.log("You need to set your IFTTT Maker URL - copy the URL from https://ifttt.com/services/maker/settings into the .env file against 'IFTTT_MAKER_URL'");
else
  iftttId = process.env.IFTTT_MAKER_URL.split('https://maker.ifttt.com/use/')[1];

// Show the homepage
app.use(express.static('views'));

// Handle requests from IFTTT
app.post("/", function (request, response) {
  console.log("Request received from IFTTT");
  console.log("Data: " + JSON.stringify(request.body));

  const form = {};
  form.value1 = request.body.task.text;
  form.value2 = request.body.task.type;
  form.value3 = request.body.task.text;


  if (process.env.GLITCH_APP_KEY === request.body.key) {
    console.log("Calling IFTTT.");
    // addHabiticaToDo(request.body.title);
    // Make a request to baseURL + triggerEvent + withKey + iftttId, which is the complete IFTTT Maker Request URL
    request.post({url: baseURL + triggerEvent + withKey + iftttId, form: form}, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); // Show the response from IFTTT
      }
    });
    console.log("Done triggering.");
  }
  else {
    console.log("Bad key, exiting.");
  }
  response.end();
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
