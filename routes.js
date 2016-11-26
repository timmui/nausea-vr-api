const express = require('express');
const router = express.Router();
var io;

module.exports = function (ioIn) {
    io = ioIn;
    // Configure Endpoints
    router.get('/clear', (req, res) => {
        io.emit('clear');
        res.send({});
    });

    return router;
};
