var http = require('http');
var Twitter = require('twitter');
var url = require('url');

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

// Listen to the server response
var server = http.createServer(function(req, res) {
  if(req.url === "/tweets") {
    serveResponse(res, {counts: Object.keys(all_tweets).length});
  } else if(req.url ==="/users") {
    serveResponse(res, {counts: Object.keys(tweetsByUser).length});
  } else if(req.url ==="/counts") {
      serveResponse(res, {tweets: Object.keys(all_tweets).length, users: Object.keys(tweetsByUser).length});
  } else {
    serveResponse(res, "OK, Computer");
  }
});

server.listen(port);
