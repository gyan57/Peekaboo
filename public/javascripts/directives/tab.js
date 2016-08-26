/**
 * Created by Gkumar on 6/14/16.
 */
(function () {
    'use strict';

    angular.module('peekaboo').//Directive definition for each tabs
    directive('tab', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                heading: '@'
            },
            templateUrl: 'partials/tab',
            require: '^tabset',
            link: function (scope, elem, attr, tabsCtrl) {
                scope.active = false;
                tabsCtrl.addTab(scope)
            }
        }
    })
});