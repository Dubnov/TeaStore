(function() {
    'use strict';

    angular
        .module('teaStore').
        component('cart', {
            controller: CartController,
            controllerAs: 'ctrl',
            templateUrl: 'components/cart/cart.component.html',
            bindings: {
                cartItems: '<'
            }
        });

    CartController.$inject = ['CartFactory', '$rootScope', 'socketService', '$http'];
    
    function CartController(CartFactory, $rootScope, socketService, $http) {
        var self = this;

        self.$onInit = function() {
            self.addToCart = false;
            self.showPrice = false;

            // socketService.on('checkout', function(data) {
            //     console.log(data);
            // });

            // $http.get('/api/cart').then(data => {

            // });

        }
        
        self.removeItem = function(tea){		
            var index = self.cartItems.indexOf(tea);
            self.cartItems.splice(index, 1);
            CartFactory.removeItem(tea.item._id);
            $rootScope.cartAmount = CartFactory.getCartAmount();
        }
        
        self.updateQty = function(tea){
            CartFactory.updateItemQty(tea);
        }

        self.getTotalPrice = function(){
            var sum = 0;
            for (var i=0; i<self.cartItems.length; i++){
                sum = sum + (self.cartItems[i].item.price * self.cartItems[i].qty);
            }
            return sum;
        }
    };
})();