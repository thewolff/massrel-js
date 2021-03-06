define(['helpers'], function(helpers) {

  var intents = {
    base_url: 'https://twitter.com/intent/',
    params: {
      'text'       : '(string): default text, for tweet/reply',
      'url'        : '(string): prefill url, for tweet/reply',
      'hashtags'   : '(string): hashtag (or list with ,) without #, for tweet/reply',
      'related'    : '(string): screen name (or list with ,) without @, available for all',
      'in_reply_to': '(number): tweet id, only for reply',
      'via'        : '(string): screen name without @, tweet/reply',
      'tweet_id'   : '(number): tweet id, for retweet and favorite',
      'screen_name': '(string): only for user/profile',
      'user_id'    : '(number): only for user/profile'
    }
  };

  intents.url = function(type, options) {
    options = options || {};
    var params = [];
    for(var k in options) {
      params.push([k, options[k]]);
    }

    return intents.base_url+encodeURIComponent(type)+'?'+helpers.to_qs(params);
  };

  intents.tweet = function(options) {
    return intents.url('tweet', options);
  };

  intents.reply = function(in_reply_to, options) {
    options = options || {};
    options.in_reply_to = in_reply_to;
    return intents.tweet(options);
  };

  intents.retweet = function(tweet_id, options) {
    options = options || {};
    options.tweet_id = tweet_id;
    return intents.url('retweet', options);
  };

  intents.favorite = function(tweet_id, options) {
    options = options || {};
    options.tweet_id = tweet_id;
    return intents.url('favorite', options);
  };

  intents.user = function(screen_name_or_id, options) {
    options = options || {};
    if(!isNaN(parseInt(screen_name_or_id, 10))) {
      options.user_id = screen_name_or_id;
    }
    else {
      options.screen_name = screen_name_or_id;
    }
    return intents.url('user', options);
  };
  // alias
  intents.profile = intents.user;

  return intents;
});
