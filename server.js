const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

// Socket Config
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Create Socket Manager
require('./socketManager')(io);

// Create Routes
const routes = require('./routes')(io);

// Body parsing middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});

app.use(express.static('public'));

app.use('/', routes);

// Configure Port
if (port) {
  server.listen(port, error => {
    if (error) {
      console.error(error);
    }
    console.info(`Running on port ${port}.`);
  });
}
else {
  console.error('No port specified in config.');
}
