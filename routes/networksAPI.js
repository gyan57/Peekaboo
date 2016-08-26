/**
 * Created by Gkumar on 4/18/16.
 */

var restAPI = require('../restAPI/restAPI.js');

exports.networks = function (req, res, next) {

    console.log("Calling networks API");
    restAPI.restAPI.performRequest('agility/api/current/network/search?fields=name,networkAddress,networkMask,networkGateway,cloud[name],dnsDomain,addressRanges&limit=5000', function (data) {
        res.json(JSON.parse(data));
        console.log('data received in:', data);
    })
};

