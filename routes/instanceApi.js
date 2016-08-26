/**
 * Created by Gkumar on 3/22/16.
 */

var instanceList = require('../mysql/instanceList.js');

exports.instances = function(req, res, next) {

    instanceList.instanceList.getInstanceList(function (instances) {

        res.json(instances);

    })
};