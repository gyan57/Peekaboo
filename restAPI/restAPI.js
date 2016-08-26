/**
 * Created by Gkumar on 4/18/16.
 */

var querystring = require('querystring');
var https = require('https');
var request = require('request');

var host = 'https://172.16.27.128/';
var headers = {
    'Accept': 'application/json'
};
var auth = {
    username: 'admin',
    password: 'M3sh@dmin!'
};


var restAPI = {

    performRequest: function (endPoint, callback) {

        var options = {
            method: 'GET',
            auth: auth,
            rejectUnauthorized: false,
            uri: host + endPoint,
            headers: headers
        };

        request(options, function (err, res, body) {
            callback(body);
        });
    }
};

module.exports.restAPI = restAPI;


