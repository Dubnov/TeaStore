(function() {
    angular
        .module('teaStore')
        .factory('socketService', SocketService);

    function SocketService() {
        var socket = io();

        var service = {
            on: on,
            emit: emit
        }

        
        return service;

        function on(event, callback) {
            socket.on(event, callback);
        }

        function emit(event, data) {
            socket.emit(event, data);
        }
    }
})();