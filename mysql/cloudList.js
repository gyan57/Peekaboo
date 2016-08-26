/**
 * Created by Gkumar on 2/29/16.
 */

var sqlConnection = require('./mySqlConnectionProvider.js');
var cloudList = {
    getcloudList : function (callback){

        var connection = sqlConnection.mySqlConnectionProvier;
        var startConnection = connection.getSqlConnection();
        var cloud  = [];
        var sqlStatement = "select id,name from VMCloud where deleted=0";

        if (startConnection) {

            startConnection.query(sqlStatement, function (err, rows, fields) {

                rows.forEach(function(row){
                    cloud.push(row)
                });
                callback(cloud);
            });


        }
        connection.closeSqlConnection(startConnection);
    },

    getClouddetails : function(cloud,callback) {

        var connection = sqlConnection.mySqlConnectionProvier;
        var startConnection = connection.getSqlConnection();
        var cloudDetails = [];
        //console.log("details that have been passed...",cloud);

        var lastcloud = cloud[cloud.length - 1].name;
        if(startConnection) {

            cloud.forEach(function (cloudlist) {

                var countrow = 0;

                var sqlStatement = "select vmi.hostname as hostname,vmi.state as vmState,vmos.name as vmOS, vmi.publicAddress as IPAddress, " +
                    "vmce.name as env, vmcp.name as project, vmi.startTime as startTime, vmu.name as userName " +
                    "from  VMInstance vmi " +
                    "inner join VMStack vms on vms.slot_id = (select slot_id from VMStack where id = vmi.stack_id) " +
                    "inner join VMOperatingSystem vmos on vmos.id = vms.operatingSystem_id " +
                    "left join VMTemplate vmt on vmt.id = vmi.template_id " +
                    "left join VMContainer vmcp on vmcp.id = vmt.project_id " +
                    "left join VMContainer vmce on vmce.id = vmt.environment_id " +
                    "left join VMUser vmu on vmu.id = vmi.lastStartedOrStoppedById " +
                    "where vmi.state!=6 and vmi.hostname!=\'NULL\' and " +
                    "((vms.latest=1) or (vms.latest=0 and vms.version=\'-1\')) and vmi.cloud_id=" + cloudlist.id + " group by vmi.hostname";
                startConnection.query(sqlStatement, function(err,rows,fields) {

                    if(rows.length == 0){
                        cloudDetails.push(
                            {
                                hostname: "",
                                cloud: cloudlist.name
                            });
                        if (lastcloud == cloudlist.name && countrow == rows.length) {
                            callback(cloudDetails);
                        }
                    } else {
                        rows.forEach(function (row) {
                            countrow++;
                            cloudDetails.push(
                                {
                                    hostname: row.hostname,
                                    OSType : row.vmOS,
                                    state : row.vmState,
                                    ipAddress: row.IPAddress == null ? "N/A" : row.IPAddress,
                                    project: row.project == null ? "N/A" : row.project,
                                    env: row.env == null ? "N/A" : row.env,
                                    startTime: row.startTime == null ? "N/A" : row.startTime,
                                    userName: row.userName == null ? "N/A" : row.userName,
                                    cloud: cloudlist.name
                                });
                            if (lastcloud == cloudlist.name && countrow == rows.length) {
                                callback(cloudDetails);
                            }
                        });
                    }
                })
            })

        }
        connection.closeSqlConnection(startConnection);
    }
};

module.exports.cloudList = cloudList;