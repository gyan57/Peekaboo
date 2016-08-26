(function () {
    'use strict';

    angular.module('stateFilter', [])
        .filter('stateFilter', function () {
            return function (state) {
                var stateArray = ['UnKnown', 'Starting', 'Running', 'Paused', 'Stopping', 'Stopped', 'Destroyed', 'Failed', 'Degraded'];
                return stateArray[state];
            }
        })
})();