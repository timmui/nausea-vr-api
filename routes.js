const express = require('express');
const router = express.Router();
var io;

module.exports = function (ioIn) {
    io = ioIn;
    // Configure Endpoints
    router.get('/reset', (req, res) => {
        io.emit('reset');
        res.send({ message: 'Sent Reset' });
    });

    return router;
};
