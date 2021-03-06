(function() {
	'use strict';

	angular
		.module('teaStore')
		.factory('CartFactory', ['$http', '$q', CartFactory]);

	// CartFactory.$inject = ['$http', '$q'];
		
	function CartFactory($http, $q){
        return {
			getCartItem: function(itemId) {
				return JSON.parse(sessionStorage.getItem(itemId));
			},
            getCartItems: function(){
				var items = [];
				
				for (var i=0; i< sessionStorage.length; i++){
					items.push(JSON.parse(sessionStorage.getItem(sessionStorage.key(i))));
				}				
                return items;                
            },
            addCartItem: function(item){
				var itemInCart = sessionStorage.getItem(item._id);
				
				if (itemInCart === null){
					sessionStorage.setItem(item._id, JSON.stringify({item: item, qty: 1}));				
				}
				else{
					sessionStorage.setItem(item._id, JSON.stringify({item: item, qty: JSON.parse(itemInCart).qty + 1}));
				}	
            },
			removeItem: function(id){
				sessionStorage.removeItem(id);
			},
			removeAllItems: function() {
				sessionStorage.clear();
			},
			getCartAmount: function(){
				return sessionStorage.length;
			},
			updateItemQty: function(cartItem){
				var itemInCart = sessionStorage.getItem(cartItem.item._id);
				
				if (itemInCart === null){
					return;
				}
				else {
					sessionStorage.setItem(cartItem.item._id, JSON.stringify(cartItem));
				}

			},
			convertToNIS: function (usdSum) {
				var deferred = $q.defer();

				$http.get('http://api.fixer.io/latest?base=USD')
				.then((response) => {
					deferred.resolve(usdSum * response.data.rates.ILS);
				})

				return deferred.promise;
			}
        }
	};

})();
