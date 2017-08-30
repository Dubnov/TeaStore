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

    HomeController.$inject = ['socketService'];

    function HomeController(socketService) {
        var self = this;
        socketService.emit('home', 'controller');
        socketService.on('data', function(data) {
            console.log(data);
        });

        self.$onInit = function() {
            self.teas = initData(self.teas.data);
            self.addToCart = false;
            self.showPrice = false;

            
        }

        function initData(data) {
			if (!data) {
				return data;
			}
			var results = [];
			for (var i = 0; i < data.length; i++) {
				results = results.concat(data[i].teas);
			}

			return results;
		}
    }
})();