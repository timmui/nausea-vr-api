const express = require('express');
const _ = require('lodash');
const router = express.Router();

var io;

module.exports = function (ioIn) {
    io = ioIn;
    // Configure Endpoints
    router.get('/reset', (req, res) => {
        io.emit('reset');
        res.send({ message: 'Sent reset' });
    });

    router.get('/intensity', (req, res) => {
        //test
        io.emit('intensity', {
            amount: 13.37,
        });

        res.send({ message: 'Sent intensity' });
    });

    router.get('/rotation', (req, res) => {
        console.log(req.query);
        io.emit('rotation');
        res.send({ message: 'Sent rotation' });
    });

    router.get('/deltaEyes', (req, res) => {
        io.emit('deltaEyes');
        res.send({ message: 'Sent deltaEyes' });
    });

    return router;
};
