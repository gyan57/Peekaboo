/**
 * Created by Gkumar on 2/29/16.
 */

var mysql  = require('mysql');
var mySqlConnectionDetails = require('./mySqlConnectionDetails.js');

var mySqlConnectionProvider = {

    getSqlConnection : function(){

        var connection = mysql.createConnection(mySqlConnectionDetails.mySqlConnectionDetails.connectString);
        connection.connect(function(error){
            if (error)
            {
                throw error
            }
            console.log("Connection to DB complete!!");
        });
        return connection;
    },

    closeSqlConnection : function(currentConnection){
    currentConnection.end(function (error) {
       if (error)
       {
           throw error
       }
        console.log("Connection closed succesfully");
    });
}


};

module.exports.mySqlConnectionProvier = mySqlConnectionProvider;
