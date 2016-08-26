/**
 * Created by Gkumar on 3/22/16.
 */

var sqlConnection = require('./mySqlConnectionProvider');

var instanceList = {

    getInstanceList : function(callback) {

        var connection = sqlConnection.mySqlConnectionProvier;
        var startConnection = connection.getSqlConnection();

        var instance = [];

        var sqlStatement = 'select vmi.hostname, vmos.name as OS, vmc.name as Cloud ' +
            'from VMInstance vmi inner join VMCloud vmc on vmc.id = vmi.cloud_id ' +
            'inner join VMStack vms on vms.slot_id = (select slot_id from VMStack where id = vmi.stack_id) ' +
            'inner join VMOperatingSystem vmos on vmos.id = vms.operatingSystem_id ' +
            'where vmi.hostname!=\'NULL\' ' +
            'and vmi.state!=6 and ((vms.latest=1) or (vms.latest=0 and vms.version=\'-1\')) group by vmi.hostname';

        if (startConnection) {

            startConnection.query(sqlStatement, function (err , rows, fields) {

                rows.forEach(function(row){
                    instance.push(row)
                });
                callback(instance);
            });
        }

        connection.closeSqlConnection(startConnection);

    }
};

module.exports.instanceList = instanceList;

