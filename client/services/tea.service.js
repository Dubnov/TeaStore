angular.module('teaStore').
    factory('TeaFactory', function teaFactory($http, $q){
        // var teaList;
        // var teaTypeList;
        var service = {
            getAllTeas: getAllTeas,
            getTeaById: getTeaById,
            getAllTeaTypes: getAllTeaTypes
        }

        return service;
    
        function getAllTeas() {
            return $http.get('/api/teas');
        }

        function getTeaById(teaId) {
            return $http.get('/api/teas/' + teaId);
        }

        function getAllTeaTypes() {
            return $http.get('/api/teatypes');
        }
});