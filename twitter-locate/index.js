var http = require('http');
var Twitter = require('twitter');
var url = require('url');
var fs = require('fs');

var port = 8080;

var cooldown = 30;

var client = new Twitter({
  consumer_key: 'IIhzOVLC8hh8AKXtCZsXxIhZR',
  consumer_secret: 'hYLG6fSPIHKnTLKN7mXIOG7znZLcDYj1XXxDXcotInah7amEq2',
  access_token_key: '',
  access_token_secret: ''
});

var yesterdayDate = function() {
  var now = new Date();
  now.setDate(now.getDate() - 1);
  return now;
};

var yesterday = yesterdayDate();

var all_tweets = {};
var tweetsByUser = {};

var tweetCount = function() {
  return Object.keys(all_tweets).length;
}

var usersCount = function() {
  return Object.keys(tweetsByUser).length;
}

var estimatedUsersCount = function() {
  return usersCount() * 13;
}

var recordTweet = function(tweet) {
  if(all_tweets[tweet.id] === undefined) {
    all_tweets[tweet.id] = {
      tweet_id: tweet.id,
      str_id: tweet.str_id,
      user_id: tweet.user.id,
      count: 0
    }
  }
  all_tweets[tweet.id].count++;

  if(tweetsByUser[tweet.user.id] === undefined) {
    tweetsByUser[tweet.user.id] = {
      tweet_id: tweet.id,
      str_id: tweet.str_id,
      user_id: tweet.user.id,
      count: 0
    }
  }
  tweetsByUser[tweet.user.id].count++;
}

var yesterday = yesterdayDate();
console.log("Going back to " + yesterday);

var params = {
  q: 'flamengo',
  location: '-22.912777,-43.2300404,0.5km',
  count: 100,
  result_type: 'recent',
  include_entities: false
};

var last_tweet;
var doneFetching = false;

var grabTweets = function() {
  if(last_tweet) {
    params.max_id = last_tweet.id;
  } else {
    console.log("No last tweet");
  }
  client.get('search/tweets', params, function(error, results, response){
    if (!error) {
      var tweets = results.statuses;

      console.log("Found " + tweets.length + " tweets");
      last_tweet = tweets[tweets.length - 1];
      tweets.forEach(function(tweet) {
        if (Date.parse(tweet.created_at) < yesterday) {
          // Done fetching!
          doneFetching = true;
          console.log("This tweet is really old: " + tweet.created_at + " - https://twitter.com/statuses/" + tweet.id_str);
        } else {
          recordTweet(tweet);
          console.log("This will be counted: " + tweet.created_at + " - https://twitter.com/statuses/" + tweet.id_str);
        }
      });

      if(!doneFetching) {
        console.log("Go on fetching in " + cooldown + " seconds - " + last_tweet.id + " ## - https://twitter.com/statuses/" + last_tweet.id_str);
        setTimeout(grabTweets, cooldown * 1000);
      }
    }
  });
}

grabTweets();

var serveResponse = function(response, body) {
  response.writeHead(200);
  response.end(JSON.stringify(body));
}

var serveFS = function(response, path) {
  fs.readFile("dist" + path, 'utf8', function(err, data) {
    if (err) {
      response.writeHead(404);
      response.end("This are not the files you're looking for");
    } else {
      response.writeHead(200);
      if(path === "/index.html") {
        data = data.replace("17,203", estimatedUsersCount());
      }
      response.end(data);
    }
  });
}

// Listen to the server response
var server = http.createServer(function(req, res) {
  if(req.url === "/tweets") {
    serveResponse(res, {counts: tweetCount()});
  } else if(req.url ==="/users") {
    serveResponse(res, {counts: usersCount()});
  } else if(req.url ==="/counts") {
    serveResponse(res, {tweets: tweetCount(), users: usersCount()});
  } else if(req.url === "/") {
    serveFS(res, "/index.html");
  } else {
    serveFS(res, req.url);
  }
});

server.listen(port);
