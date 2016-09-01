/**
 * Created by Gkumar on 4/19/16.
 */

(function () {
    'use strict';

    angular.module('peekaboo')
        //network controller to get details of Cloud,networks
        .controller('networkCtrl', networkCtrl);

    networkCtrl.$inject = ['$log', '$scope', 'apiServices'];
    
    function networkCtrl($log, $scope, apiServices) {

        //get details for network page
        apiServices.getNetworks()
            .then(function (data) {
                $log.debug("display all received data from network", data);           
                data.assets.forEach(function(a){
                    try{  
                        a.addressRanges.forEach(function(b){
                            console.log(b.href);
                        });
                    } catch (err){
                       
                    }
            
                    
                });
                $scope.networks = data.assets.filter(function(d){
                    return d.hasOwnProperty("networkAddress") && d.networkAddress != "";
                });
            
            });
    }
})();