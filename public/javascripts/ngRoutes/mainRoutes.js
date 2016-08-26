/**
 * Created by Gkumar on 3/4/16.
 */
(function() {
    'use strict';

    angular.module('peekaboo')
        //These are the route Providers
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'partials/index',
                    controller: 'menuCtrl'
                })
                .when('/overview', {
                    templateUrl: 'partials/overviewMain',
                    controller: 'overviewCtrl'
                })
                .when('/instances', {
                    templateUrl: 'partials/instances',
                    controller: 'instanceCtrl'
                })
                .when('/networks', {
                    templateUrl: 'partials/networks',
                    controller: 'networkCtrl'
                })
                .otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
        }]);
})();
