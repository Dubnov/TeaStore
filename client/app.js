(function(){
    
    angular.module('teaStore',['ngRoute']).
        config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
              when('/', {
                templateUrl: 'pages/home.html',
                controller: 'HomeController',
                resolve: {
                    teaList: function(TeaFactory){
                        return TeaFactory.getTeas();
                    }
                }
              }).
              when('/about', {
                templateUrl: 'pages/about.html'
              }).
              when('/allTeas', {
                templateUrl: 'pages/allTeas.html',
                controller: 'AllTeasController',
                resolve: {
                    teaList: function(TeaFactory){
                        return TeaFactory.getTeas();
                    },
					teaTypeList: function(TeaFactory){
						return TeaFactory.getTeaTypes();
					}
                }
              }).
              when('/tea/:teaId', {
                templateUrl: 'pages/tea.html',
                controller: 'TeaController',
                resolve: {
                    teaList: function(TeaFactory){
                        return TeaFactory.getTeas();
                    }
                }
              }).
              when('/cart', {
                  templateUrl: 'pages/cart.html',
                  controller: 'CartController',
                  resolve: {
                      cartItems: function(CartFactory){
                          return CartFactory.getCartItems();
                      }
                  }         
              }).
			when('/error', {
				templateUrl: 'pages/error.html'				
			})
              .otherwise('/');
        }
      ]).
	run(function($rootScope, $location){
		$rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
			event.preventDefault();
			$location.path('/error');
		})
	}) 
	
})();
