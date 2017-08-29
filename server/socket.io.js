// TODO: configure socket.io

const server = require('socket.io');
let io = null;

module.exports.init = (app) => {
    io = server(app);
}