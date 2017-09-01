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
            .state('stores', {
                url: '/stores',
                component: 'stores',
                resolve: {
                    stores: function(StoreFactory) {
                        return StoreFactory.getAllStores();
                    }
                }
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
            .state('manager-teas', {
                url: '/manager-teas',
                component: 'manageTeas',
                resolve: {
                    teas: function(TeaFactory){
                        return TeaFactory.getAllTeas();
                    },
                    teaTypeList: function(TeaFactory){
                        return TeaFactory.getAllTeaTypes();
                    }
                }                
            })
            .state('manager-teatypes', {
                url: '/manager-teatypes',
                component: 'manageTeaTypes',
                resolve: {
                    teaTypes: function(TeaFactory){
                        return TeaFactory.getAllTeaTypes();
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