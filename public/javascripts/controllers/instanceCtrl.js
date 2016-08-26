/**
 * Created by Gkumar on 3/4/16.
 */
(function () {
    'use strict';

    angular.module('peekaboo')
        // Controller for Instance view
        .controller('instanceCtrl', instanceCtrl);

    instanceCtrl.$inject = ['$log','$scope', '$filter','apiServices'];

    function instanceCtrl($log, $scope, $filter, apiServices) {

        var stateArray = ['UnKnown', 'Starting', 'Running', 'Paused', 'Stopping', 'Stopped', 'Destroyed', 'Failed', 'Degraded'];

        ///get details for Overview page
        apiServices.getClouds()
            .then(function(data) {
                data.forEach(function (data) {

                    data.state = stateArray[data.state];
                    data.startTime = data.startTime.substring(0, 10);
                });
                $scope.instances =  data;
                $log.debug($scope.instances);

            });
    }


})();
