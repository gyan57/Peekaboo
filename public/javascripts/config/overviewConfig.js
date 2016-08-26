/**
 * Created by Gkumar on 3/4/16.
 */
(function () {
    'use strict';

    angular.module('peekaboo')
        //These are the route Providers
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('index', {
                    url: '/',
                    templateUrl: 'partials/index',
                    controller: 'menuCtrl'
                })
                .state('overviewMain', {
                    url: '/overview',
                    templateUrl: 'partials/overviewMain',
                    controller: 'overviewCtrl'
                })
                .state('instances', {
                    url: '/instances',
                    templateUrl: 'partials/instances',
                    controller: 'instanceCtrl'
                })
                .state('networks', {
                    url: '/networks',
                    templateUrl: 'partials/networks',
                    controller: 'networkCtrl'
                })
                .state('overviewMain.cloudTables', {
                    url: '/overviewMain.cloudTables',
                    templateUrl: 'partials/overviewMain.cloudTables',
                    controller: 'overviewCtrl'
                })
                .state('overviewMain.cloudCharts', {
                    url: '/overviewMain.cloudCharts',
                    templateUrl: 'partials/overviewMain.cloudCharts',
                    controller: 'overviewCtrl'
                });

            $urlRouterProvider
                .when('/', 'partials/index')
                .when('/overview', 'partials/overviewMain')
                .when('/instances', 'partials/instances')
                .when('/networks', 'partials/networks')
                .otherwise("/");
        }]);
})();