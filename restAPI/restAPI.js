/**
 * Created by Gkumar on 4/18/16.
 */

var querystring = require('querystring');
var https = require('https');
var request = require('request');

var host = 'https://192.168.108.190:8443/';
var headers1 = {
    'Accept': 'application/json'
};
var auth1 = {
    username: 'admin',
    password: 'x0cloud'
};


var restAPI = {

    performRequest: function (endPoint, callback) {
        var options = {
            method: 'GET',
            auth: auth1,
            rejectUnauthorized: false,
            uri: host + endPoint,
            headers: headers1
        };
	console.log('making request');	
        request(options, function (err, res, body) {
            callback(body);
        });
    }
};

module.exports.restAPI = restAPI;


