/**
 * Created by Gkumar on 6/14/16.
 */
(function () {
    'use strict';

    angular.module('peekaboo').// Controller details for tabsets
    controller('tabsetCtrl', tabsetCtrl);

    tabsetCtrl.$inject = ['$scope'];

    function tabsetCtrl($scope) {
        $scope.templateUrl = '';
        var tabs = $scope.tabs = [];
        var controller = this;

        this.selectTab = function (tab) {
            angular.forEach(tabs, function (tab) {
                tab.selected = false;
            });
            tab.selected = true;
        };

        this.setTabTemplate = function (templateUrl) {
            $scope.templateUrl = templateUrl;
        }

        this.addTab = function (tab) {
            if (tabs.length == 0) {
                controller.selectTab(tab);
            }
            tabs.push(tab);
        };
    }
})
