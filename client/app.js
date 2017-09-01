(function(){
    
    angular.module('teaStore',['ui.router', 'ngMaterial', 'ngFileUpload']).
	run(function($rootScope, $location){
		$rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
			event.preventDefault();
			$location.path('/error');
		});
	});
})();
