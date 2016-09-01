/**
 * Created by Gkumar on 3/4/16.
 */
    angular
        .module('peekaboo')
        //Controller for layout
        .controller('menuCtrl', menuCtrl);

    menuCtrl.$inject = ['$scope'];

    function menuCtrl($scope) {

        //we can keep adding menu on side and their corresponding links.
        $scope.menuItemsSide = [
            {
                menuName: 'Overview',
                menuLinks: '/overview'
            },
            {
                menuName: 'Instances',
                menuLinks: '/instances'
            },
            {
                menuName: 'Networks',
                menuLinks: '/networks'
            },
	    {
		menuName: 'AuditLog',
		menuLinks: '/auditlog'
	    }];
        //Set those menus to active
        $scope.setActive = function (menuItem) {
            $scope.activeMenu = menuItem;
        };

        //Menus on top
        $scope.menuItemsTop = [
            {
                menuName: 'Dashboard',
                menuLinks: '/'
            },
            {
                menuName: 'Settings',
                menuLinks: '/settings'
            },
            {
                menuName: 'Profile',
                menuLinks: '/profile'
            },
            {
                menuName: 'Help',
                menuLinks: '/help'
            }];

    }
