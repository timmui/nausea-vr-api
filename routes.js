const express = require('express');
const _ = require('lodash');
const router = express.Router();

var io;

// intensity
var intensityThrottle = 1000;
var intensityQueue = [];
var throttledIntensity = _.throttle(function emitRotation() {
    var value = _.mean(intensityQueue);
    console.log(`Sending intensity: ${value}`);
    io.emit('intensity', {
        amount: value,
    });
    intensityQueue = [];
}, intensityThrottle);

// Rotation
var rotationThrottle = 1000;
var rotationQueue = [];
var throttledRotation = _.throttle(function emitRotation() {
    var value = _.mean(rotationQueue);
    console.log(`Sending rotation: ${value}`);
    io.emit('rotation', {
        amount: value,
    });
    rotationQueue = [];
}, rotationThrottle);

// deltaEyes
var deltaEyesThrottle = 1000;
var deltaEyesQueue = [];
var throttledDeltaEyes = _.throttle(function emitDeltaEyes() {
    var value = _.mean(deltaEyesQueue);
    console.log(`Sending deltaEyes: ${value}`);
    io.emit('deltaEyes', {
        amount: value,
    });
    deltaEyesQueue = [];
}, deltaEyesThrottle);

module.exports = function (ioIn) {
    io = ioIn;
    // Configure Endpoints
    router.get('/reset', (req, res) => {
        io.emit('reset');
        res.send({ message: 'Sent reset' });
    });

    router.get('/intensity', (req, res) => {
        intensityQueue.push(parseFloat(req.query.amount));

        throttledIntensity();

        res.send({ message: 'Added intensity to queue' });
    });

    router.get('/rotation', (req, res) => {
        rotationQueue.push(parseFloat(req.query.amount));

        throttledRotation();

        res.send({ message: 'Added rotation to queue' });
    });

    router.get('/deltaEyes', (req, res) => {
        deltaEyesQueue.push(parseFloat(req.query.amount));

        throttledDeltaEyes();

        res.send({ message: 'Added deltaEyes to queue' });
    });

    return router;
};
