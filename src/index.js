const http = require('http');
const { routes } = require('./routes/tasks.routes');

// DB CONNECTION
const {createConnection} = require('./database');
createConnection();

const port = process.env.PORT || 4000;

const server = http.createServer( (req, res) => {
    routes(req, res);
});

server.listen(port);
console.log('Server on port', port);