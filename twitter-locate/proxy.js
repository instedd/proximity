var http = require('http');
var fs = require('fs');
var port = 8080;

var cachedTweets;

fs.readFile("cached-tweets.js", 'utf8', function(err, data) {
  if (err) throw err;
  cachedTweets = data;

  // Listen to the server response
  var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end(cachedTweets);
    console.log(new Date() + " - Served " + req.url);
  });

  server.listen(port);
});
