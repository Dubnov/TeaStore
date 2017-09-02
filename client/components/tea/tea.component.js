(function() {
    'use strict';

    angular
        .module('teaStore')
        .component('tea', {
            templateUrl: 'components/tea/tea.component.html',
            controller: TeaController,
            controllerAs: 'ctrl',
            bindings: {
                tea: '<'
            }
        });

    TeaController.$inject = [];

    function TeaController(){
        var self = this;

        self.$onInit = function() {
            self.tea = self.tea.data;
            self.addToCart = true;
            self.imageUrl = self.tea.image ? 'public/Images/' + self.tea.image : 'public/Images/tea.jpg';
        };        
    }
})()