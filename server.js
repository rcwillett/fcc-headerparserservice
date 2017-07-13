// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/whoami", function (req, res){
    var userOS = null;
    var userOSParsed = req.get("User-Agent").match(/\([^\)]+\)/);
    var originIp;
    if(userOSParsed){
      userOS = userOSParsed[0].replace(/[\(\)]+/g, "");
    }
    if(req.headers['x-forwarded-for'] ){
      originIp = req.headers['x-forwarded-for'].substr(0,7) === "::ffff:" ? req.headers['x-forwarded-for'].substr(7,13) : req.headers['x-forwarded-for'].substr(0,13);
    }
    else{
      originIp = req.connection.remoteAddress;
    }
  
    var responseObject = {
      ipaddress : originIp,
      language: req.get("Accept-Language").substr(0,5),
      software: userOS
    };

    res.send(responseObject);
    res.end();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
