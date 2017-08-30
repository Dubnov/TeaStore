angular.module('teaStore').
    factory('CartFactory', function cartFactory(){
        return {            
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

			}
        }
});
