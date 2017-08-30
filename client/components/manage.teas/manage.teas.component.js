(function() {
    'use strict';

    angular
        .module('teaStore')
        .component('manageTeas', {
            controller: ManageTeasController,
            controllerAs: 'ctrl',
            templateUrl: 'components/manage.teas/manage.teas.component.html',
            bindings: {
                
            }
        });

    ManageTeasController.$inject = [];

    function ManageTeasController() {
        var self = this;

        self.$onInit = function() {

        };
    }
})();