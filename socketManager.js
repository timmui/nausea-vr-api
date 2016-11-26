const _ = require('lodash');

var io;

/**
 * Comment Manager initializer
 *
 * @param {Socket.io instance} socketIo
 *
 * @construtor
 */
module.exports = function CommentManager(socketIo) {
    io = socketIo;

    // On Client Connection
    io.on('connection', (socket) => {
        console.log('Client Connected');

        // Register Handlers

        // Get history request
        socket.on('throwUp', (data) => {
            return throwEmail(data, socket);
        });
    });
};


/**
 * Recieves throw up messgae
 *
 * @param {Object} data - Data payload from the client
 * @param {Socket} socket - Socket connection to the client
 */
function throwUp(data, socket) {
    // Send email?
}