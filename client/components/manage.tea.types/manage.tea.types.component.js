(function() {
    'use strict';

    angular
        .module('teaStore')
        .component('manageTeaTypes', {
            controller: ManageTeaTypesController,
            controllerAs: 'ctrl',
            templateUrl: 'components/manage.tea.types/manage.tea.types.component.html',
            bindings: {
                
            }
        });

    ManageTeaTypesController.$inject = [];

    function ManageTeaTypesController() {
        var self = this;

        self.$onInit = function() {

        };
    }
})();