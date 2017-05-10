angular.module('teaStore').
    factory('TeaFactory', function teaFactory($http, $q){    
        var teaList;
		var teaTypeList;
	
        return {            
            getTeas: function(){
                var d = $q.defer();
                if (teaList) {
                    d.resolve(teaList);
                }
                else {
                    $http.get('http://localhost:3000/teas.json').then(
                    
						function success(response){		
                        teaList = response.data;
						angular.forEach(teaList, function(item){
							item.price = parseFloat(item.price);
						});
                        d.resolve(teaList);
                    },
                    function failure(reason){
                        d.reject(reason);
                    });                    
				}
                return d.promise;
			},
            getTeaById: function(teaId){
                var selectedTea;
                
				if(teaList){
					angular.forEach(teaList, function(value, key){
						if (value.id === teaId){
							selectedTea = value;
							return;
						}
					});

					return selectedTea;
				}
            },
			getTeaTypes: function(){
				var d = $q.defer();
                if (teaTypeList) {
                    d.resolve(teaTypeList);
                }
                else {
                    $http.get('http://localhost:3000/tea_types.json').then(
                    
						function success(response){
                        teaTypeList = response.data;
                        d.resolve(teaTypeList);
                    },
                    function failure(reason){
                        d.reject(reason);
                    });                    
				}
                return d.promise;
			}
		}
});