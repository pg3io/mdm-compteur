var Twitter = require('twitter');
var Q = require('q');
var config = require('../config');
const target_id = config.twitter.target_id
const target_username = config.twitter.target_username

var client = new Twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
});

exports.get = function(callback) {
    var deferred = Q.defer();
    if (target_id)
        client.get('users/show', {"user_id": target_id}, function (error, data, response) {
            if(!error && data && data.followers_count) {
                deferred.resolve(data.followers_count);
            } else {
                deferred.reject(error);
            }
        });
    else if (target_username)
        client.get('users/show', {"screen_name": target_username}, function (error, data, response) {
            if(!error && data && data.followers_count) {
                deferred.resolve(data.followers_count);
            } else {
                deferred.reject(error);
            }
        });
    else 
        client.get('account/verify_credentials', {}, function (error, data, response) {
            if(!error && data && data.followers_count) {
                deferred.resolve(data.followers_count);
            } else {
                deferred.reject(error);
            }
        });
    deferred.promise.nodeify(callback);
    return deferred.promise;
};