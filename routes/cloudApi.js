/**
 * Created by Gkumar on 3/3/16.
 */

var cloudlist = require('../mysql/cloudList.js');

/* GET Cloud details page. */
exports.clouds = function(req, res, next) {

    cloudlist.cloudList.getcloudList(function (clouds) {

        cloudlist.cloudList.getClouddetails(clouds, function(details)
        {
            res.json(details);
        });
    });
};
