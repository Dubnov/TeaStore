angular.module('teaStore').
    factory('TeaFactory', function teaFactory($http, $q){
        var service = {
            getAllTeas: getAllTeas,
            getTeaById: getTeaById,
            getAllTeaTypes: getAllTeaTypes,
            addTea: addTea,
            updateTea: updateTea,
            deleteTea: deleteTea,
            getAllCaffeineLevels: getAllCaffeineLevels
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

        function addTea(tea) {
            return $http.post('/api/teas', tea);
        }

        function updateTea(tea) {
            return $http.put('/api/teas', tea);
        }

        function deleteTea(teaId) {
            return $http.delete('/api/teas/' + teaId);
        }

        function getAllCaffeineLevels() {
            return [{
                key:0,
                value:"Free"
            }, {
                key:1,
                value:"Low"
            }, {
                key:2,
                value:"Medium"
            }, {
                key:3,
                value:"High"
            }];
        }
});