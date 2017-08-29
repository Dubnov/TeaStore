(function() {
    'use strict';

    angular
        .module('teaStore')
        .component('home', {
            controller: HomeController,
            controllerAs: 'ctrl',
            templateUrl: 'components/home/home.component.html',
            bindings: {
                teas: '<'
            }
        });

    HomeController.$inject = [];

    function HomeController() {
        var self = this;

        self.$onInit = function() {
            self.teas = self.teas.data;
            self.addToCart = false;
            self.showPrice = false;
        }
    }
})();