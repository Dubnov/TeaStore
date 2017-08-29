(function() {
    'use strict';

    angular
        .module('teaStore')
        .config(['$stateProvider', '$urlRouterProvider', routesConfigFunction]);

    function routesConfigFunction($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                component: 'home',
                resolve: {
                    teas: function(TeaFactory){
                        return TeaFactory.getAllTeas();
                    }
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'pages/about.html'
            })
            .state('teas', {
                url: '/teas',
                component: 'teas',
                resolve: {
                    teas: function(TeaFactory){
                        return TeaFactory.getAllTeas();
                    },
                    teaTypeList: function(TeaFactory){
                        return TeaFactory.getAllTeaTypes();
                    }
                }
            })
            .state('tea', {
                url: '/tea/:id',
                component: 'tea',
                resolve: {
                    tea: function(TeaFactory, $stateParams){
                        return TeaFactory.getTeaById($stateParams.id);
                    }
                }
            })
            .state('cart', {
                url: '/cart',
                component: 'cart',
                resolve: {
                    cartItems: function(CartFactory){
                        return CartFactory.getCartItems();
                    }
                }         
            })
            .state('error', {
                utl: '/error',
                component: ''				
            });            
    }
})();