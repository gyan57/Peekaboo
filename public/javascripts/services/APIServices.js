/**
 * Created by Gkumar on 3/4/16.
 */
(function () {
    'use strict';

    angular.module('peekaboo')
        //All API Services to get data for different views
        .service('apiServices', apiServices);

    apiServices.$inject = ['$q', '$http', '$log'];

    function apiServices($q, $http, $log) {

        this.getClouds = function () {
            var deffered = $q.defer();
            $http.get('/cloud/list')
                .success(function (response) {
                    deffered.resolve(response)
                })
                .error(function (msg, code) {
                    deffered.reject(msg);
                    $log.error(msg, code);
                });
            return deffered.promise;
        };

        // Get list of all Instance that are running on Agility
        this.getInstances = function () {
            var deffered = $q.defer();
            $http.get('/instance/list')
                .success(function (response) {
                    deffered.resolve(response)
                })
                .error(function (msg, code) {
                    deffered.reject(msg);
                    $log.error(msg, code);
                });
            return deffered.promise;
        };

        // Get list of all networks and their cloud Provider
        this.getNetworks = function () {
            var deffered = $q.defer();
            $http.get('/network/list')
                .success(function (response) {
                    deffered.resolve(response)
                })
                .error(function (msg, code) {
                    deffered.reject(msg);
                    $log.error(msg, code);
                });
            return deffered.promise;
        };

        // Get list of all packages

        // Get list of instance provisioned in last one week

        // Get list of all assetProperties default and create by user.

        // Get list of all assignedPoliecis(exclude default ones) on a Project. Make them drop down(projects)

        }
})();
