(function() {
    'use strict';

    angular
        .module('teaStore')
        .component('manager', {
            controller: ManagerController,
            controllerAs: 'ctrl',
            templateUrl: 'components/manager/manager.component.html',
            bindings: {
                
            }
        });

    ManagerController.$inject = [];

    function ManagerController() {
        var self = this;

        self.$onInit = function() {

        };
    }
})()